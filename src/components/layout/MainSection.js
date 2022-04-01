import React from "react";
import {MenuItem, Select, FormControl, makeStyles} from '@material-ui/core';

import "./MainSection.css";
import "../../App.css";
import InfoDisplayCard from "./InfoDisplayCard";
import Map from "../map/Map";
import NewsSection from "./NewsSection";


const useStyle = makeStyles(themes => ({
    formControl: {
        minWidth: 100   
    }
}));

const MainSection = props => {
    

    const muiClasses = useStyle();

    const handleNewlySelectedCountry = (e) => {
        props.handleFrom(e.target.value);
    }

    return (
        <section className="primary-section">
            <div className="header">
                <h1><span className="title">COVID-19</span> <span>Tracker</span></h1>
                <div className="card-wrapper">
                    <FormControl className={muiClasses.formControl}>
                        <Select value={props.countrySelected.value} onChange={handleNewlySelectedCountry}>
                            {props.countries.map((country, index) => {
                                return <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </div>
            </div>

            <div className="infoCard-container">
                
                <InfoDisplayCard 
                    title={"Total cases"}
                    amount={props.countrySelected.cases}    
                    amountToday={props.countrySelected.todayCases}
                    textColor={"yellow-text"}
                />

                <InfoDisplayCard 
                    title={"Total Recovered"}
                    amount={props.countrySelected.recovered}
                    amountToday={props.countrySelected.todayRecovered}
                    textColor={"green-text"}
                />

                <InfoDisplayCard 
                    title={"Total Deaths"}
                    amount={props.countrySelected.deaths}
                    amountToday={props.countrySelected.todayDeaths}
                    textColor={"red-text"}
                />
            </div>

            <Map center={props.mapCenter} countriesData={props.countriesData} /> 

            <NewsSection />
        </section>
    );
}

export default MainSection;