import React, { Component } from 'react';
import './App.css';
import Homestay from './components/Homestay';
import GoogleMapReact from 'google-map-react';

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
                      key={homestay.id}
                      homestay={homestay} />
            })}
          </div>
        </div>
        <div className="peta">
          <GoogleMapReact
            center={center}
            zoom={15}
          >
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}
export default App;