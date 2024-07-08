import React, {useState} from 'react';
import WorldMap from './WorldMap';
import DataBox from '../Components/DataBox/DataBox';
import {SearchBar}  from '../Components/Search/SearchBar';
import {SearchResultsList} from '../Components/Search/SearchResultsList'
import "./Visualisation.css";
import Key from '../Components/Key/Key';
import Dropdown from '../Components/Dropdown/Dropdown';
import DimSwitchStyles from '../Components/DimSwitch/DimSwitch.module.css';


const Visualisation = () => {
    const [results, setResults] = useState([]);
    const [switchChecked, setSwitchChecked] = useState(true);
    const [selectedOption, setSelectedOption] = useState(2);
    const handleSelect = (value: any) => {
            setSelectedOption(value);
        };

    const handleSwitchToggle = () => {
        setSwitchChecked(prevState => !prevState);
    };

    return (
        <div className="App">
            <header className="App-header" style={{padding: 30}}>
                <Key curVisIndex={selectedOption}/>
                <DataBox selectedOption={selectedOption}/>
                <WorldMap switchChecked={switchChecked} selectedDataIndex={selectedOption}/>
                <div className="search-container">
                    <SearchBar setResults = {setResults} />
                    <SearchResultsList results = {results} />
                    <Dropdown onSelect={handleSelect} currSelectedIndex={selectedOption} />
                    <label className={DimSwitchStyles.switch}>
                        <span className={`${DimSwitchStyles.switchLabel2D} ${!switchChecked ? '' : DimSwitchStyles.hidden}`}>2D</span>
                        <input
                            type="checkbox"
                            checked={switchChecked}
                            onChange={handleSwitchToggle}
                        />
                        <span className={DimSwitchStyles.slider}></span>
                        <span className={`${DimSwitchStyles.switchLabel3D} ${switchChecked ? '' : DimSwitchStyles.hidden}`}>3D</span>
                    </label>
                </div>
            </header>
        </div>
    );
};

export default Visualisation;