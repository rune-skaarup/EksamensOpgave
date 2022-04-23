import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'
import logo from "../assets/img/logo.png";

//SCSS
import "./adminNav.scss"


const AdminNavbar = () => {

  const { signout, loggedin } = useContext( LoginContext )

  return (
    <nav>
      <div className="navbar">
        <img src={ logo } alt="Logo" />

        <ul>
          <li> <NavLink to="/"> Home </NavLink> </li>
          <li> <NavLink to="home"> Admin home </NavLink> </li>
          <li> <NavLink to="adminAbout"> Admin about </NavLink> </li>
          <li> <NavLink to="adminTour"> Admin tour </NavLink> </li>
          <li> <NavLink to="adminOpretTour"> Admin Opret ny tour </NavLink> </li>
          <li> <NavLink to="adminSeKontakt">Admin Kontakt</NavLink> </li>
          <li> <NavLink to="adminSeFooter">Admin Footer &amp; Kontakt info</NavLink> </li>

          {
            loggedin &&
            <button className='logud' onClick={ signout }> LOG UD </button>
          }

        </ul>
      </div>
    </nav>


  )
}

export default AdminNavbar