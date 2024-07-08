import React, {useContext} from 'react';
import { CovidContext } from "../../Context/CovidContext";
import "./SearchResult.css";


export const SearchResult = ({result}) => {
    const {selectedCountry,setSelectedCountry, setHoveredCountry, setSearchedCountry} = useContext(CovidContext);
    

    console.log(result);
    return (
        <div className = "search-result" onClick={(e) => { setSelectedCountry(result);
            setSearchedCountry(result);
        }}>
            {result.location}

        </div>
    )
}