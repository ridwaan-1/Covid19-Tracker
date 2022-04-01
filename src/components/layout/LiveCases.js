import React from 'react';
import "./LiveCases.css";

const LiveCases = (props) => {
    let liveCountryData = [...props.countries];

    liveCountryData.sort((a,b) => {
        return b.todayCases - a.todayCases;
    });

    return ( 
        <table id="livecases-table">
            <tbody>
                {liveCountryData.map((country, index) => (
                    country.todayCases!=0 && (
                    <tr key={index}>
                        <td>{country.name}</td>
                        <td>{country.todayCases.toLocaleString()}</td>
                    </tr> )
                ))}
            </tbody>
        </table>
    );
}
 
export default LiveCases;