import React, {useState} from "react";
import {FaSearch} from "react-icons/fa";
import { feature } from "topojson-client"
import "./SearchBar.css";

export const SearchBar = ({setResults}) => {
    const [input, setInput] = useState("")

    const fetchData = (value) => {
        // Return early if the value is empty or null
        if (!value) {
            setResults([]);
            return;
        }
    
        fetch("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json")
        .then((response) => response.json())
        .then((json) => {
            const extractedData = Object.entries(json).map(([countryCode, countryData]) => ({
                location: countryData.location,
                total_cases: countryData.total_cases,
                total_cases_per_million: countryData.total_cases_per_million,
                last_updated_date: countryData.last_updated_date,
                population: countryData.population
            }));

            const startsWithValue = [];
            const doesNotStartWithValue = [];
    
            // Separate results into two arrays based on whether they start with the search value or not
            extractedData.forEach((country) => {
                const countryName = country.location.toLowerCase();
                if (countryName.startsWith(value.toLowerCase())) {
                    startsWithValue.push(country);
                } else if (countryName.includes(value.toLowerCase())) {
                    doesNotStartWithValue.push(country);
                }
            });
    
            // Sort arrays alphabetically
            startsWithValue.sort((a, b) => a.location.localeCompare(b.location));
            doesNotStartWithValue.sort((a, b) => a.location.localeCompare(b.location));
            // Concatenate the arrays, putting the ones starting with the value first
            const results = startsWithValue.concat(doesNotStartWithValue);
            setResults(results);
        });
    };
    
    

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };

    return (
        <div className = "input-wrapper">
            <FaSearch id = "search-icon"/>
            <input 
            placeholder = "Search for a country..." 
            value={input} 
            onChange={(e) => handleChange(e.target.value)}/>
        </div>
    )
}