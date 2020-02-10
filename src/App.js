import React, { Component } from 'react';
import './App.css';
import Homestay from './components/Homestay';
import { Map, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import { Icon } from "leaflet";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      homestays: []
    };
  }

  componentDidMount() {
    fetch("https://raw.githubusercontent.com/algosigma/js-reactjs/master/homestays.json")
      .then(response => response.json())
      .then((data) => {
        this.setState({
          homestays: data
        });
      })
  }
  
  render() {
    const skater = new Icon({
      iconUrl: "./skater.svg",
      iconSize: [25, 25]
    });

    const center = {
      lat: -7.797068,
      lng: 110.371754
    }

    return(
      <div className="app">
        <div className="main">
          <div className="homestays">
            {this.state.homestays.map((homestay) => {
              return <Homestay
                      key={homestay.nama}
                      homestay={homestay} />
            })}
          </div>
        </div>
        <div className="peta">
        <Map center={center} zoom={15}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {this.state.homestays.map(homestay => (
        <Marker
          key={homestay.id}
          position={[
            homestay.lat,
            homestay.lng
          ]}>

            <Popup >
              <span><b>{homestay.nama}</b></span>
            </Popup>

            <Tooltip direction='right' offset={[-8, -2]} opacity={1} permanent>
                          <span>Rp {homestay.harga} rb</span>
            </Tooltip>

        </Marker>
       
          
      ))}

{/* {parkData.features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          position={[
            park.geometry.coordinates[1],
            park.geometry.coordinates[0]
          ]}
          onClick={() => {
            setActivePark(park);
          }}
        />
      ))} */}




    </Map>
        </div>
      </div>
    );
  }
}
export default App;