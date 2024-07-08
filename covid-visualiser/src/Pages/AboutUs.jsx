import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className='about_container'>
            <div className='about_text_container'>
                <h3>Hello</h3>
                <h1 className='h1_about'>Kia Ora!</h1>
                <p>
                    Welcome to our COVID-19 Data Visualization project, crafted by a team of Software Engineering students from Victoria University of Wellington. <br/><br/>

                    Our journey began in the classroom of SWEN422, where we united our skills and passion for software engineering to tackle the pressing issue of understanding and visualising COVID-19 data. Over six intensive weeks, we delved into the intricate world of data visualisation using the powerful Javascript D3 library. <br/><br/>

                    Our mission is simple yet profound: to provide accessible and insightful visualisations of COVID-19 data from around the world. Through our platform, we aim to empower researchers, policymakers, and the general public with the knowledge they need to navigate the complexities of the pandemic.<br/><br/>

                    At the heart of our project lies a commitment to clarity, accuracy, and innovation. We believe that by harnessing the power of data visualisation, we can shed light on the challenges posed by COVID-19 and contribute to the collective effort to overcome them.<br/><br/>

                    Thank you for joining us on this journey. Together, let's navigate through the data, gain new insights, and work towards a healthier, safer world.
                </p>

                <h2 className='h2_about'>Lets Connect</h2>
                <p>
                    Contact us with any questions or queries using the information below: <br/><br/>

                    <strong>Email:</strong> <em>contact@gmail.com</em> <br/>
                    <strong>Phone:</strong> <em>000 0000 0000</em>  <br/>
                    <strong>LinkedIn:</strong> <em>covid-vis</em> <br/>
                </p>
                <p>
                   <em> Data for visualisations sourced from: Oxford COVID-19 Government Response Tracker, Blavatnik School of Government, University of Oxford</em>
                   <br/>
                   <br/>
                   <br/>
                   <br/>
                   <br/>
                   <br/>
                   <br/>
                </p>
            </div>
        </div>
    );
};

export default AboutUs;