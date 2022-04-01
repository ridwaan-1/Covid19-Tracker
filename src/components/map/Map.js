import React from 'react';
import './Map.css';
import '../../App.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';


const Map = props => {

  const getColor = d => {
      return d > 50 ? '#BD0026':
             d > 30 ? '#E31A1C':
             d > 20 ? '#FC4E2A':
             d > 15 ? '#f2645a':
             d > 10 ? '#f28880':
             d > 7 ? '#FD8D3C':
             d > 3 ? '#FEB24C':
             d > 0.5 ? '#FED976':
                       '#FFEDA0';
  }
  
  const style = (feature) => ({
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
  });

  console.log(props.center);

  return (
    <div className="card-wrapper map-container">
      <div className='map-title flex-display flex-spaceBetween flex-center-vertical'>
        <h1>COVID-19 Affected Countries</h1>
        <div className='map-labels'>
          <p>Severely Affected</p>
          <p>Least Affected</p>
        </div>
      </div>

      <MapContainer center={props.center} zoom={2} id="map-style">
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">carto.com</a> contributors'
          url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'
        />
        <GeoJSON data={props.countriesData} style={style} />
      </MapContainer>
    </div>
  );
}

export default Map;


