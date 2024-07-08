import React, { useState, useEffect, useCallback, useContext, useRef } from "react";
import { geoMercator, geoOrthographic, geoPath } from "d3-geo";
import { feature } from "topojson-client"
import { CovidContext } from "../Context/CovidContext";
import { throttle } from 'lodash';
import { geoDistance } from 'd3-geo';
import Papa from 'papaparse';
import Timeline from "../Components/Timeline/Timeline";
import timelineItems from "./Constants";
import { visualisationsKey } from "./Constants";
import { resolveTypeReferenceDirective } from "typescript";
import { selectedFillColor, fillHoverColor } from "./Constants";
import { SearchRounded } from "@mui/icons-material";
import styles from './WorldMap.module.css';

const cities = [
    { name: "Tokyo", coordinates: [139.6917, 35.6895], population: 37843000 },
    { name: "Jakarta", coordinates: [106.8650, -6.1751], population: 30539000 },
    { name: "Delhi", coordinates: [77.1025, 28.7041], population: 24998000 },
    { name: "Manila", coordinates: [120.9842, 14.5995], population: 24123000 },
    { name: "Seoul", coordinates: [126.9780, 37.5665], population: 23480000 },
    { name: "Shanghai", coordinates: [121.4737, 31.2304], population: 23416000 },
    { name: "Karachi", coordinates: [67.0099, 24.8615], population: 22123000 },
    { name: "Beijing", coordinates: [116.4074, 39.9042], population: 21009000 },
    { name: "New York", coordinates: [-74.0059, 40.7128], population: 20630000 },
    { name: "Guangzhou", coordinates: [113.2644, 23.1291], population: 20597000 },
    { name: "Sao Paulo", coordinates: [-46.6333, -23.5505], population: 20365000 },
    { name: "Mexico City", coordinates: [-99.1332, 19.4326], population: 20063000 },
    { name: "Mumbai", coordinates: [72.8777, 19.0760], population: 17712000 },
    { name: "Osaka", coordinates: [135.5022, 34.6937], population: 17444000 },
    { name: "Moscow", coordinates: [37.6173, 55.7558], population: 16170000 },
    { name: "Dhaka", coordinates: [90.4125, 23.8103], population: 15669000 },
    { name: "Greater Cairo", coordinates: [31.2357, 30.0444], population: 15600000 },
    { name: "Los Angeles", coordinates: [-118.2437, 34.0522], population: 15058000 },
    { name: "Bangkok", coordinates: [100.5018, 13.7563], population: 14998000 },
    { name: "Kolkata", coordinates: [88.3639, 22.5726], population: 14667000 },
    { name: "Buenos Aires", coordinates: [-58.3816, -34.6037], population: 14122000 },
    { name: "Tehran", coordinates: [51.3890, 35.6892], population: 13532000 },
    { name: "Istanbul", coordinates: [28.9784, 41.0082], population: 13287000 },
    { name: "Lagos", coordinates: [3.3792, 6.5244], population: 13123000 },
    { name: "Shenzhen", coordinates: [114.0579, 22.5431], population: 12084000 },
    { name: "Rio de Janeiro", coordinates: [-43.1729, -22.9068], population: 11727000 },
    { name: "Kinshasa", coordinates: [15.2663, -4.4419], population: 11587000 },
    { name: "Tianjin", coordinates: [117.3616, 39.3434], population: 10920000 },
    { name: "Paris", coordinates: [2.3522, 48.8566], population: 10858000 },
    { name: "Lima", coordinates: [-77.0428, -12.0464], population: 10750000 },
]
const countryMap = {
    "United States of America": "United States",
    "Central African Rep.": "Central African Republic",
    "Dem. Rep. Congo": "Democratic Republic of Congo",
    "S. Sudan": "South Sudan",
}

export const getCountryName = (name) => {
    return countryMap[name] || name;
}
// Dimensions of the SVG element containing the map.
const width = 1200;
const height = 600;


const WorldMap =  ({ switchChecked, selectedDataIndex }) => {
    const {covidTimelineData, setCovidTimelineData, selectedDate, setSelectedDate} = useContext(CovidContext);
    const [geographies, setGeographies] = useState([]) // Stores the geographical features of countries.
    const [projectionType, setProjectionType] = useState("2D");
    const [rotation, setRotation] = useState([175.4636292330157, -50.2796711477132, 0]);
    const [isRotating, setIsRotating] = useState(false); // Track if the globe is currently rotating
    const [targetRotation, setTargetRotation] = useState(null);
    const [covidData, setCovidData] = useState([]) // Stores the geographical features of countries.
    const {selectedCountry,setSelectedCountry, setHoveredCountry} = useContext(CovidContext);
    const {setSearchedCountry, searchedCountry} = useContext(CovidContext);
    const currentSelectedRef = useRef(null);
    const countriesRef = useRef({});
    
    const handleDateChange = (date) => {
        setSelectedDate(date);
      };

    const assignCountryColour = (index) => {
        try {
            const currVisDataName = visualisationsKey[selectedDataIndex].dataName;
            if (
                covidTimelineData[selectedDate][index] &&
                (typeof covidTimelineData[selectedDate][index][currVisDataName] === 'undefined' ||
                covidTimelineData[selectedDate][index][currVisDataName] === null ||
                covidTimelineData[selectedDate][index][currVisDataName] === 'Blank')
            ) {
                return '#bdbdbd';
            }
            const countryName = geographies[index].properties.name;

            let val = 0;
            for (let instance in covidTimelineData[selectedDate]){
                if (covidTimelineData[selectedDate][instance].countryName === countryName){   
                    val = covidTimelineData[selectedDate][instance][currVisDataName];
                }
                
            }

            const thresholdLen = visualisationsKey[selectedDataIndex].thresholds.length;
            
            for (let i = 0; i < thresholdLen; i++) {
                if (val <= visualisationsKey[selectedDataIndex].thresholds[i]) {
                  return visualisationsKey[selectedDataIndex].colours[i];
                }
              }

            return '#bdbdbd';
        } catch (error) {
            return '#bdbdbd';
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseGeo = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
                const responseGit = await fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json');
                const responseGitTimeline = await fetch(
                    "./groupedByDate.json"
                ).then((res) => res.json()); 
    
                if (!responseGeo.ok || !responseGit || !responseGitTimeline) {
                    throw new Error('Failed to fetch data');
                }
                const [dataGeo, dataGit] = await Promise.all([
                    responseGeo.json(),
                    responseGit.json()
                ]);
                const geographiesData = feature(dataGeo, dataGeo.objects.countries).features;
                const extractedData = Object.entries(dataGit).map(([countryCode, countryData]) => ({
                    location: getCountryName(countryData.location),
                    total_cases: countryData.total_cases,
                    total_cases_per_million: countryData.total_cases_per_million,
                    last_updated_date: countryData.last_updated_date,
                    population: countryData.population
                }));

                setGeographies(geographiesData);
                setCovidTimelineData(responseGitTimeline);
                setCovidData(extractedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [])


    // Handler for when a country is clicked.
    const handleCountryClick = (e, countryName, i) => {
        currentSelectedRef?.current?.setAttribute('fill', assignCountryColour(currentSelectedRef?.current?.getAttribute('dataKey')));
        const countryData = covidData.find((country) => getCountryName(country.location).toLowerCase().replace(' ', '') === getCountryName(countryName)?.toLowerCase().replace(' ', ''));
        setSelectedCountry(countryData);
        e.target.setAttribute('fill', selectedFillColor);
        currentSelectedRef.current = e.target;
        const centroid = geoPath().centroid(geographies[i]);
        const newRotation = [-centroid[0], -centroid[1], 0]; // Rotate to the centroid of the selected country
        setTargetRotation(newRotation);
    }

    // Function to handle mouse hover events
    const handleCountryHover = (e, countryName, i) => {
        const setTextElement = () => {
            const textElement = document.getElementById('country-text');
            if (textElement) {
                textElement.textContent = countryName;
                textElement.setAttribute('font-size', '16px');
            } else {
                const countryData = covidData.find((country) => getCountryName(country.location).toLowerCase().replace(' ', '') === getCountryName(countryName).toLowerCase().replace(' ', ''));
                setHoveredCountry(countryData);
            }    
        };

        const removeTextElement = () => {
            const textElement = document.getElementById('country-text');
            if (textElement) {
                textElement.textContent = '';
                textElement.parentNode.removeChild(textElement);
            }
        };

        if (e.type === 'mouseenter') {
            if(e.target.getAttribute('fill') !== selectedFillColor){
                e.target.setAttribute('fill', fillHoverColor);
            }
            setTextElement();
        } else if (e.type === 'mouseleave') {
            if(e.target.getAttribute('fill') !== selectedFillColor){
                e.target.setAttribute('fill', assignCountryColour(i));
            }
            removeTextElement();
        }
    };

    // Handler for when a city marker is clicked.
    const handleMarkerClick = i => {
        console.log("Marker: ", cities[i])
    }

    const handleMouseDown = event => {
        const initialMouseX = event.clientX;
        const initialMouseY = event.clientY;

        const handleMouseMove = moveEvent => {
            const deltaX = moveEvent.clientX - initialMouseX;
            const deltaY = moveEvent.clientY - initialMouseY;

            const newRotation = [
                rotation[0] + deltaX / 2,
                rotation[1] - deltaY / 2,
                rotation[2],
            ];

            setRotation(newRotation);
        };

        const throttledMouseMove = throttle(handleMouseMove, 30);

        const handleMouseUp = () => {
            window.removeEventListener("mousemove", throttledMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };

        window.addEventListener("mousemove", throttledMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    useEffect(() => {
        toggleProjection();
    });

    useEffect(() => {
        if (searchedCountry) {
            handleCountryOrientate(searchedCountry);
        }
    }, [searchedCountry]);

    useEffect(() => {
        if (targetRotation !== null) {
            setIsRotating(true);
            rotateToTarget();
        }
    }, [targetRotation]);

    const rotateToTarget = () => {
        const endRotation = targetRotation;

        const startTime = performance.now();
        const duration = 250; // Duration of rotation animation in milliseconds

        const animateRotation = (timestamp) => {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            setRotation(rotation.map((angle, index) => angle + (endRotation[index] - angle) * progress));

            if (progress < 1) {
                requestAnimationFrame(animateRotation);
            } else {
                setIsRotating(false);
                setTargetRotation(null);
            }
        };

        requestAnimationFrame(animateRotation);
    };


    // Update toggleProjection to use switchState
    const toggleProjection = () => {
        setProjectionType(switchChecked ? "2D" : "3D");
    };

    
    const handleCountryOrientate = (searchedCountry) => {
        const normalizedSearchedCountry = String(getCountryName(searchedCountry.location)).trim().toLowerCase();
        const country = geographies.find((country) => {
            const countryName = getCountryName(country?.properties?.name)?.trim()?.toLowerCase();
            return countryName === normalizedSearchedCountry;
        });

        if (country) {
            const centroid = geoPath().centroid(country); // Use the centroid of the found country
            const newRotation = [-centroid[0], -centroid[1], 0]; // Rotate to the centroid of the selected country
            setTargetRotation(newRotation);
            if (countriesRef.current[country.properties.name]) {
                const countryIndex = geographies.indexOf(country);
                currentSelectedRef?.current?.setAttribute('fill', assignCountryColour(countryIndex));
                countriesRef.current[country.properties.name].setAttribute('fill', selectedFillColor);
                currentSelectedRef.current = countriesRef.current[country.properties.name];
            }
            
        } else {
            console.log("Country not found: ", normalizedSearchedCountry);
        }

    };


    const renderMap = () => {
        const width = 1100;
        const height = 550;
        const projection = projectionType === "3D" ? (
            geoOrthographic()
                .scale(275)
                .translate([width / 2, height / 2])
                .rotate(rotation)
                .precision(0.1)
        ) : (
            geoMercator()
                .scale(130)
                .translate([width / 2 - 50, height / 2 + 110])
                .rotate([-10,0,0])
        );
    // Render the SVG element with map.
    return (
        <div className={styles.container}>
            <svg
                width={width}
                height={height}
                viewBox={projectionType === "2D" ? `-50 0 ${width} ${height}` : `0 0 ${width} ${height}`}
                onMouseDown={projectionType === "3D" ? handleMouseDown : undefined}
                style={{ cursor: projectionType === "3D" ? "grab" : "default" ,display:"flex", justifyContent:"center", alignContent:"center"}}
            >
                {/* Group for rendering country paths, with projection. */}
                <g className="countries">
                    {
                        geographies.map((d, i) => (
                            <path
                                key={`path-${i}`}
                                dataKey={i}
                                d={geoPath().projection(projection)(d)} // Use geoPath function with projection
                                className="country"
                                fill={assignCountryColour(i)} // 4, 85, 164 for blue 201,207,214
                                transition="fill 0.10s ease-in-out" // Add transition property for smooth color transition
                                stroke="#F6FAFD"
                                strokeWidth={0.3}
                                onClick={(e) => handleCountryClick(e,d.properties.name,i)}
                                onMouseEnter={(e) => handleCountryHover(e, d.properties.name, i)} // Call handleMouseHover for mouseenter event
                                onMouseLeave={(e) => handleCountryHover(e, '', i)} // C
                                ref={el => { countriesRef.current[d.properties.name] = el }}                            />
                        ))
                    }
                </g>
                    
                {/* Group for rendering city markers. */}
                <g className="markers">
                    {
                        cities.map((city, i) => {
                            // Calculate the forward projection of the city's coordinates.
                            const [cx, cy] = projection(city.coordinates);
                            // Calculate the inverse projection of the city's screen coordinates.
                            const [lon, lat] = projection.invert([cx, cy]);
                            // Calculate the spherical distance between the city's coordinates and its inverse projection.
                            const d = geoDistance(city.coordinates, [lon, lat]);
                            // If the spherical distance is greater than 1.57 (approximately 90 degrees), the city is not visible.
                            const isVisible = d <= 0.8;

                            return (
                                <circle
                                    key={`marker-${i}`}
                                    cx={cx}
                                    cy={cy}
                                    r={isVisible ? city.population / 3000000 : 0}
                                    fill="#0455A4"
                                    stroke="#F6FAFD"
                                    className="marker"
                                    onClick={() => handleMarkerClick(i)}
                                />
                            );
                        })
                    }
                </g>
            </svg>
            <text id="country-text" x={width - 120} y={height - 30} fill="black" style={{ position: 'absolute', top: 0, left: 0, fontSize: '16px' }}></text>
            <div>
                <Timeline items={timelineItems} onDateChange={handleDateChange} />
            </div>
        </div>
    )
}


return renderMap();
};

export default React.memo(WorldMap);