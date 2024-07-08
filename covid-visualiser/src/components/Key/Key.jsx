import React, { useContext } from "react";
import styles from "./Key.css";
import { visualisationsKey } from "../../Pages/Constants";

const Key = ({curVisIndex}) => {
  console.log(curVisIndex);
  const item = visualisationsKey[curVisIndex];
    
  return (
    <div className="keyContainer">
        <h1 className="keyTitle">{item.formatName}</h1>
        <div>
            {item.thresholdNames.map((name, index) => (
                <div className="keyItem">
                    <div style={{height: 20, width: 20, background: item.colours[index], borderRadius: 5, marginLeft: 20,}}></div> 
                    <p style={{marginBottom: 4, marginTop: 4, marginLeft: 10, fontSize: 13, color: '#404040'}}>{name}</p>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Key;
