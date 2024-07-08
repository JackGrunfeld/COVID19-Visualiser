import React, { useEffect } from 'react';
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';
import mapGraphic from '../Assets/globe.svg';

const HomePage = () => {
    useEffect(() => {
        const overlayImage = document.querySelector(`.${styles['overlay-image']}`);
        
        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;
            const { left, top, width, height } = overlayImage.getBoundingClientRect();
            const xOffset = ((clientX - left) / width - 0.5) * 10; // we can adjust this more more parallax if we want
            const yOffset = ((clientY - top) / height - 0.5) * 10;

            overlayImage.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        };

        overlayImage.addEventListener('mousemove', handleMouseMove);

        return () => {
            overlayImage.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.text_container}>
                <h3>Information Visualisation</h3>
                <h1 className={styles.h1_home}>COVID-19</h1>
                <p>
                    Welcome to our COVID-19 visualisation hub, where data meets clarity. Harnessing the power of the JavaScript D3 library, 
                    we present a comprehensive and interactive view of pandemic statistics. From global trends to localised insights, 
                    explore accurate data with intuitive visualisations. Stay informed, stay empowered, and join us in navigating through 
                    the complexities of this unprecedented era.
                </p>
                <Link to="/visualisations" className={styles.home_button}>Get Started...</Link>
            </div>

            <div className={styles['overlay-image-container']}>
                <img src={mapGraphic} alt="Overlay" className={styles['overlay-image']} />
            </div>
        </div>
    );
};

export default HomePage;
