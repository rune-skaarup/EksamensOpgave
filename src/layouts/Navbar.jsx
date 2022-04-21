import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'
import logo from "../assets/img/logo.png";

// CSS
import './navbar.scss'

const Navbar = () => {

  // State til at håndtere om menuen skal vises/skjules på MOBILE!
  const { loggedin, signout } = useContext( LoginContext )

  return (

    <nav >
      <div className="navbar">


        <img src={ logo } alt="Logo" />

        <div className="navbar-links ">
          <ul>
            <li><NavLink to="/">Om os</NavLink></li>
            <li><NavLink to="/about">Produkter</NavLink></li>
            <li><NavLink to="/contact">Kontakt</NavLink></li>

            {
              //Hvis man allerede er logget ind = vis logud
              loggedin &&

              <>
                <button onClick={ signout }>logud</button>
                <li><NavLink to="/admin/home">Admin</NavLink></li>
              </>

            }

            {
              //Hvis man ikke allerede er logget ind = vis login
              !loggedin && <>
                <li><NavLink to="/login">Login</NavLink></li>
              </>
            }

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar