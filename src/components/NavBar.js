import React, { Component } from 'react';
import '../styles/NavBar.css';

export default class NavBar extends Component {

  render() {
    return (
      <div className="nav-bar">
        <button className="nav-button"><a href="/">PokeNode</a></button>
        <button className="nav-button"><a href="/region">Regions</a></button>
      </div>
    );
  }

}