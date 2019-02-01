import React, { Component } from 'react';

export default class Game extends Component{

  constructor(params){
    super(params);
    
    console.log("Hello " + params.name);
  }
  
  render(){
      return (
        <div>This is the game component!</div>
      ); 
  }
  
}