import React from 'react';
import './Help.css';
import changeVisData from '../Assets/change_vis_data.png';

const Help = () => {
    return (
        <div className='help_container'>
            <div className='help_text_container'>
                <h1 className='h1_help'>Help Page</h1>

                <h2 className='h2_help'>Map Visualisation</h2>

                <h2 className='h3_help'>Change Visualisation Data</h2>
                <p>
                    To modify the displayed data, use the dropdown box located on the left, just below the search bar, as illustrated in the 
                    image below. 
                    This allows you to switch between datasets by selecting different options from the dropdown menu. <br/><br/>

                </p>

                <h2 className='h3_help'>Timeline</h2>
                <p>
                    The timeline feature enables you to observe how various datasets evolve over time. There are several ways to interact with it: <br/><br/>

                    <strong>1.</strong> Click the Left and Right arrows to shift the date by one month at a time. <br/>
                    <strong>2.</strong> Click the Play button to automatically progress through the timeline. <br/>
                    <strong>3.</strong> Click on specific points on the timeline to jump to a particular date. <br/>
                     <br/><br/>

                </p>

                <h2 className='h3_help'>Select Country</h2>
                <p>
                    Users can interact with different countries and view country-specific data in several ways:  <br/> <br/>

                    <strong>Hover over a Country:</strong> <br/>
                    By hovering over a country on the map, the country's specific data will appear in a container on the right side of the screen. <br/> <br/>

                    <strong>Click on a Country:</strong> <br/>
                    By clicking on a country on the map, it becomes 'locked in' and activates comparison mode. This allows you to compare the statistics between the clicked country and any hovered country.  <br/> <br/>

                    <strong>Search for a Country:</strong>  <br/>
                    If you cannot find the desired country on the map, you can use the search bar on the left to locate it.  <br/> <br/>
                    
                </p>

                <h2 className='h3_help'>Change 2D/3D</h2>
                <p>
                    Users are able to toggle between 2D and 3D views of the map by utalising the toggle on the left sidebar, as seen in the image below:
                    <br/><br/>
                </p>


                <h2 className='h2_help'>Chart Dashboard</h2>

                <h2 className='h3_help'>Add Countries</h2>
                <p>
                    To add a new country to the Graph Visualisations, click on the 'Countries' box on the left of the screen, and either scroll to your 
                    country the choice or search for it.
                    <br/>
                    To clear the country choices, click the 'x' next to the dropdown arrow. <br/><br/>

                </p>

                <h2 className='h3_help'>Add Metrics</h2>
                <p>
                    To add a new metric to the Graph Visualisations, click on the 'Metrics' box on the left of the screen, and either scroll to your 
                    data the choice or search for it.
                    <br/>
                    To clear the chart choices, click the 'x' next to the dropdown arrow. <br/><br/>

                </p>

                <h2 className='h3_help'>Change Chart Type</h2>
                <p>
                    To change the chart types, toggle using the 'Chart Type' dropdown on the left of the screen.  <br/><br/>

                </p>

                <h2 className='h3_help'>Expand Chart</h2>
                <p>
                    To zoom in on a selected chart, then click on the chart of choice.   <br/><br/><br/>

                </p>
            </div>
        </div>
    );
};

export default Help;