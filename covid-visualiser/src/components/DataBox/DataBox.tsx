import React, { useContext } from "react";
import styles from "./DataBox.module.css";
import { CovidContext } from "../../Context/CovidContext";
import { fillHoverColor, selectedFillColor, visualisationsKey } from "../../Pages/Constants";
import Divider from '@mui/material/Divider';
import { getCountryName } from "../../Pages/WorldMap";


interface DataBoxProps {
  selectedOption: number;
}

const DataBox = (props: DataBoxProps) => {
  const { selectedCountry, hoveredCountry, covidTimelineData, selectedDate } =
    useContext(CovidContext);
  const width = 250;
  const formatter = new Intl.NumberFormat("en-US");
  const currentDataName = visualisationsKey[props.selectedOption]?.dataName;

  const currentlySelectedDataValue =
    Number(covidTimelineData[selectedDate]?.find(
      (country: any) => getCountryName(country?.countryName)?.toLowerCase() === getCountryName(selectedCountry?.location)?.toLowerCase()
    )?.[currentDataName] ?? NaN);

  const currentlyHoveredDataValue =
    Number(covidTimelineData[selectedDate]?.find(
      (country: any) => getCountryName(country?.countryName)?.toLowerCase() === getCountryName(hoveredCountry?.location)?.toLowerCase()
    )?.[currentDataName] ?? NaN);
    

    const selectedPercentage =
    (currentlySelectedDataValue /
      (currentlySelectedDataValue + currentlyHoveredDataValue)) *
    100;
  const hoveredPercentage =
    (currentlyHoveredDataValue /
      (currentlySelectedDataValue + currentlyHoveredDataValue)) *
    100;

  const displayBar = selectedCountry?.location && hoveredCountry?.location && selectedPercentage >0 && hoveredPercentage >0;

  return (
    <>
      {!!hoveredCountry?.location && (
        <div
          className={styles.container}
          style={{
            width,
            height:
              selectedCountry?.location && (displayBar ? (hoveredCountry?.location ? 210 : 100) : (hoveredCountry?.location ? 170 : 100)),
          }}
        >
          <div className={styles.header}>
          </div>
          <div className={styles.data}>
            {getCountryName(selectedCountry?.location) && (
              <div className={`${styles.dataBox} ${styles.selected}`}>
                <div className={styles.title}>
                   <div style={{height: 20, width: 20, background: selectedFillColor, borderRadius: 5}}></div> 
                   <p className={styles.titleName}>
                  <strong>{getCountryName(selectedCountry?.location)}</strong>
                </p>
                   </div>

                <p>
                  {visualisationsKey[props.selectedOption]?.formatName}:{" "}
                  {formatter.format(currentlySelectedDataValue)}
                </p>
                <p>
                  Population: {formatter.format(selectedCountry?.population)}
                </p>
              </div>
            )}
            {getCountryName(hoveredCountry?.location) && (
              <>
                <div className={`${styles.dataBox} ${styles.hovered}`}>

                <div className={styles.title}>
                   <div style={{height: 20, width: 20, background: fillHoverColor, borderRadius: 5}}></div> 
                   <p className={styles.titleName}>
                  <strong>{getCountryName(hoveredCountry?.location)}</strong>
                </p>
                </div>

                  <p>
                    {visualisationsKey[props.selectedOption]?.formatName}:{" "}
                    {formatter.format(currentlyHoveredDataValue)}
                  </p>
                  <p>
                    Population: {formatter.format(hoveredCountry?.population)}
                  </p>
                </div>
              </>
            )}
            {displayBar && (
              <>
              <div className={styles.comparison}>
                <div className={styles.barContainer}>
                  <div
                    className={styles.first}
                    style={{ width: `${hoveredPercentage}%` , background:fillHoverColor}}
                  >
                    <span>
                      {hoveredPercentage > 10
                        ? hoveredPercentage.toFixed(0) + "%"
                        : ""}
                    </span>
                  </div>
                  <div
                    className={styles.second}
                    style={{ width: `${selectedPercentage}%`,background:selectedFillColor }}
                  >
                    <span>
                      {selectedPercentage > 10
                        ? selectedPercentage.toFixed(0) + "%"
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DataBox;
