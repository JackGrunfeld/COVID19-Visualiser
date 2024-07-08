import React, { useState } from 'react';
import './Dropdown.css';
import { IoIosArrowDown } from "react-icons/io";
import { visualisationsKey } from "../../Pages/Constants";

const Dropdown = ({onSelect, currSelectedIndex}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value) => {
    onSelect(value);
    setIsOpen(false); 
  };


  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-button">
        {visualisationsKey[currSelectedIndex].formatName}
        <IoIosArrowDown className='downArrow'/>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {visualisationsKey.map(option => (
            <div
            key={option.dataName}
            className="dropdown-item"
            onClick={() => handleSelect(option.index)}
          >
            {option.formatName}
          </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
