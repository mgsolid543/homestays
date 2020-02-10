import React, { Component } from 'react';
import './Marker.css';

class Marker extends Component {
    render() {
        return (
        <div className="marker">{this.props.text} rb</div>
        );
    }
}
export default Marker;