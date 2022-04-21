import React, { useEffect, useState } from "react";
import "./hero.scss"

import hero from '../assets/img/hero.png'
import logo from '../assets/img/logo.png'

const Hero = () => {

  return (

    <div className="hContainer">
      
      <img src={hero} alt="Hero" className="centerLogo"/>
      <img src={logo} alt="Logo" className="cornerLogo"/>

      <h1>Events</h1>
      <h1>Travels</h1>
    </div>
  )
}

export default Hero