import React, { Component } from 'react';
import './App.css';
import Homestay from './components/Homestay';
import { Map, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
//import Marker from './components/Marker';
//import { Icon } from "leaflet";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      homestays: [],
      selectedHomestay: null,
      allHomestay: [],
      search: ""
    };
  }

  componentDidMount() {
    fetch("https://raw.githubusercontent.com/algosigma/js-reactjs/master/homestays.json")
      .then(response => response.json())
      .then((data) => {
        this.setState({
          homestays: data,
          allHomestays: data
        });
      })
  }

  selectHomestay = (homestay) => {
    this.setState({
      selectedHomestay: homestay
    })
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
      homestays: this.state.allHomestays.filter((homestay) =>
        new RegExp(event.target.value, "i").exec(homestay.nama)
      )
    })
  }
  
  render() {
    let center = {
      lat: -7.797068,
      lng: 110.371754
    }

    if (this.state.selectedHomestay) {
      center = {
        lat: this.state.selectedHomestay.lat,
        lng: this.state.selectedHomestay.lng
      };
    }

    return(
      <div className="app">
        <div className="main">
          <div className="search">
            <input type="text"
                    placeholder="Search..."
                    value={this.state.search}
                    onChange={this.handleSearch}
            />
          </div>
          <div className="homestays">
            {this.state.homestays.map((homestay) => {
              return <Homestay
                      key={homestay.nama}
                      homestay={homestay} 
                      selectHomestay={this.selectHomestay} />
            })}
          </div>
        </div>
        <div className="peta">
        <Map center={center} zoom={15}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {this.state.homestays.map((homestay) => {
              return <Marker
                        key={homestay.id}
                        position={[
                          homestay.lat,
                          homestay.lng
                        ]}>
                        <Popup>
                          <span><b>{homestay.nama}</b></span>
                        </Popup>

                        <Tooltip direction='right' offset={[-8, -2]} opacity={1} permanent>
                                      <span id="selectedHS">Rp {homestay.harga} rb</span>
                        </Tooltip>
                                  
                        </Marker>
          })}
        </Map>
        </div>
      </div>
    );
  }
}
export default App;