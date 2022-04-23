import React, { useEffect, useState } from "react";
//SCSS
import "./hero.scss";

import hero from '../assets/img/hero.png';
import logo from '../assets/img/logo.png';
import arrow from '../assets/img/arrow.png';

const Hero = () => {

  return (

    <div className="hContainer">

      <img src={ hero } alt="Hero" className="centerLogo" />
      <img src={ logo } alt="Logo" className="cornerLogo" />

      <h1>Events</h1>
      <h1>Travels</h1>

      <a href="#navbar"><img src={ arrow } alt="pil ned" className="arrow" /></a>
 
    </div>
 )
}

export default Hero