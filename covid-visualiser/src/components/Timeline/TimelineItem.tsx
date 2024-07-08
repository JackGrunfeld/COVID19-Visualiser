import React from 'react';
import styles from './TimelineItem.module.css'; 
import { TiArrowSortedDown } from "react-icons/ti";

const TimelineItem = ({ year, date, onClick, clicked, yearShown}: any) => {
  return (
    <div
      className={`${styles['timeline-item']} ${clicked ? `${styles.clicked}` : ''}`}
      onClick={onClick}
    >
      <div className={styles["timeline-item-content"]}>
        <TiArrowSortedDown className={`${styles.arrow} ${clicked ? `${styles.clicked}` : ''}`}/>
        <div className={`${styles.horizontalLine} ${yearShown ? `${styles.year}` : ''}`}/>
        <div className={`${styles.verticalLine} ${yearShown ? `${styles.year}` : ''}`}/>
        <p className={`${styles.yearText} ${yearShown ? `${styles.show}` : ''}`}>{year}</p>
      </div>
    </div>
  );
};

export default TimelineItem;
