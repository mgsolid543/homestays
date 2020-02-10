import React, { Component } from 'react';
import './App.css';
import Homestay from './components/Homestay';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
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
    </Map>
        </div>
      </div>
    );
  }
}
export default App;