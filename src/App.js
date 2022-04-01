import React, { useState,useEffect } from 'react';
import './App.css';
import countriesData from './components/assets/contriesGEOJSON';
import MainSection from "./components/layout/MainSection";
import SideSection from './components/layout/SideSection';

function App() {
  const [countries, setCountries] = useState([]);
  const [countrySelected, setCountrySelected] = useState({
      name: "",
      value: "",
      lat: 0,
      long: 0,
      todayCases: "",
      cases: "",
      todayDeaths: "",
      deaths: "",
      todayRecovered: "",
      recovered: "",
  });
  const [mapCenter, setMapCenter] = useState([0, 0]);

  useEffect(() => {
    const getCountriesData = async () => {
        await fetch("https://disease.sh/v3/covid-19/countries")
        .then(Response => Response.json())
        .then(data => {
            let wwtodayCases = 0, wwCases = 0, wwtodayDeaths = 0, wwDeaths = 0,
                wwtodayRecovered = 0, wwRecovered = 0;

            const countries = data.map(country => {
              let id = country.countryInfo.iso3;
              let numCases = country.cases;
              let totalPopulation = country.population;

              wwCases+=numCases;
              wwtodayCases+=country.todayCases;
              wwDeaths+=country.deaths;
              wwtodayDeaths+=country.todayDeaths;
              wwRecovered+=country.recovered;
              wwtodayRecovered+=country.todayRecovered;

              const countryObj = countriesData.features.find((cData) => {
                if(cData.id===id) {
                  cData.properties.density = numCases/totalPopulation * 100;
                }
                return cData.id===id;
              });

              return {
                name: country.country,
                value: id,
                lat: country.countryInfo.lat,
                long: country.countryInfo.long,
                todayCases: country.todayCases,
                cases: numCases,
                todayDeaths: country.todayDeaths,
                deaths: country.deaths,
                todayRecovered: country.todayRecovered,
                recovered: country.recovered,
              }
            });

            countries.push({
              name: 'Worldwide',
              value: 'WW',
              lat: 0,
              long: 0,
              todayCases: wwtodayCases,
              cases: wwCases,
              todayDeaths: wwtodayDeaths,
              deaths: wwDeaths,
              todayRecovered: wwtodayRecovered,
              recovered: wwRecovered,
            });
            setCountries(countries);
            setCountrySelected(countries[countries.length-1]);
        })
    }

    getCountriesData();
  },[]);

  const handleForm = (e) => {
    const country = countries.filter( country => country.value===e );
    setCountrySelected(country[0]);
    setMapCenter([country[0].lat, country[0].long]);
  }

  return (
    <main>
      <MainSection countrySelected={countrySelected} countries={countries} countriesData={countriesData} mapCenter={mapCenter} handleFrom={handleForm}/> 
      <SideSection countries={countries} />
    </main>
  );
}

export default App;


