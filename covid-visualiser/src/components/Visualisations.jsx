import React, {useState} from 'react';
import WorldMap from './WorldMap';
import DataBox from './DataBox/DataBox';
import { SearchBar } from './Search/SearchBar';
import { SearchResultsList } from './Search/SearchResultsList'
import "./Visualisation.css";
import Key from './Key/Key';
import DimSwitchStyles from './DimSwitch/DimSwitch.module.css';
import Dropdown from './Dropdown/Dropdown';

const Visualisation = () => {
    const [results, setResults] = useState([]);
    const [switchChecked, setSwitchChecked] = useState(false);
    const [selectedOption, setSelectedOption] = useState(2);

    const handleSelect = (value) => {
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