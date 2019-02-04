import React, { Component } from 'react';
import '../styles/NavBar.css';

export default class NavBar extends Component {

  render() {
    return (
      <div className="nav-bar">
        <button className="nav-button">PokeNode</button>
      </div>
    );
  }

}