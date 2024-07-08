import React, { useState, useEffect } from 'react';
import TimelineItem from './TimelineItem';
import styles from './Timeline.module.css'; 
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline, IoPauseCircleOutline, IoPlayCircleOutline } from "react-icons/io5";

const Timeline = ({ items, onDateChange } :any) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = (index: number) => {
    setSelectedItemIndex(index);
    onDateChange(items[index].dataName); 
  };

  const handlePrev = () => {
    setSelectedItemIndex((prevIndex) => {
        const newIndex = prevIndex === 0 ? items.length - 1 : prevIndex - 1;
        onDateChange(items[newIndex].dataName); 
        return newIndex;
      });
  };

  const handleNext = () => {
    setSelectedItemIndex((prevIndex) => {
        const newIndex = prevIndex === items.length - 1 ? 0 : prevIndex + 1;
        onDateChange(items[newIndex].dataName); 
        return newIndex;
      });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let intervalId : any;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setSelectedItemIndex((prevIndex) => {
            const newIndex = prevIndex === items.length - 1 ? 0 : prevIndex + 1;
            onDateChange(items[newIndex].dataName); 
            return newIndex;
          });
      }, 500);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isPlaying, items.length]);


  return (
      <div className={styles.container}> 
        <div className={styles["timeline-container"]}>
            <div className={styles["timeline"]}>
                {items.map((item: any, index: any) => (
                <TimelineItem
                    key={index}
                    year={item.year}
                    content={item.content}
                    date={item.date}
                    yearShown={item.yearShown}
                    onClick={() => handleClick(index)}
                    clicked={index === selectedItemIndex}
                />
                ))}
            </div>
            
        </div>
        <IoArrowBackCircleOutline style={{ color: '#043A6E' }} onClick={handlePrev}/>
        <button className={styles['timeline-button']} onClick={handlePlayPause}>
            {isPlaying ? <IoPauseCircleOutline style={{ color: '#043A6E', fontSize: '27px'}} /> : <IoPlayCircleOutline style={{ color: '#043A6E', fontSize: '27px'}}  />}
        </button>
        <IoArrowForwardCircleOutline style={{ color: '#043A6E' }} onClick={handleNext}/>
      </div>
   
  );
};

export default Timeline;
