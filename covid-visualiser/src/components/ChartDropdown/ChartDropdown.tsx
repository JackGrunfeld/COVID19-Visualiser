import React, { useState } from 'react';
import styles from './ChartDropdown.module.css';
import { IoIosArrowDown } from "react-icons/io";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ChartDropdown = ({onSelect, currSelectedChartName} : any) => {
  const [isOpen, setIsOpen] = useState(false);

  const chartOptions = ["AreaChart", "Chart", "BarChart"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: any) => {
    onSelect(value);
    setIsOpen(false); 
  };



  return (
    <div className={styles.dropdown}>
      <button onClick={toggleDropdown} className={styles['dropdown-button']}>
        <div>
          <div className={styles.chartTitle}>Chart Type</div>
          <div>
            <div className={styles.selectedChart}>
              {currSelectedChartName}
            </div>
            <ArrowDropDownIcon className={styles.downArrow} />
          </div>
        </div>
        
      </button>
      {isOpen && (
        <div className={styles['dropdown-menu']}>
          {chartOptions.map(option => (
            <div
            key={option}
            className={styles['dropdown-item']}
            onClick={() => handleSelect(option)}
          >
            {option}
          </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChartDropdown;
