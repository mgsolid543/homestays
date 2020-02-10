import React, { Component } from 'react';
import './App.css';
import Homestay from './components/Homestay';

class App extends Component {
  
  render() {

    const homestay = {
      "nama" : "Lembang Homestay",
      "fotoUrl" :  "http://bukulokomedia.com/foto/homestay-3.jpg",
      "harga": 300
    };

    return(
      <div className="app">
        <div className="main">
          <div className="homestays">
            <Homestay homestay={homestay} />
            <Homestay homestay={homestay} />
            <Homestay homestay={homestay} />
          </div>
        </div>
        <div className="peta"></div>
      </div>
    );
  }
}
export default App;