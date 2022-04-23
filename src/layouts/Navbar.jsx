import React, { useState, useContext } from 'react'
import Loading from "../components/Loading"
import Error from '../components/Error';
import { NavLink } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'
import logo from "../assets/img/logo.png";

// apikald
import { soegTours } from '../helpers/apikald';


// CSS
import './navbar.scss'

const Navbar = () => {

  // State til at håndtere om menuen skal vises/skjules på MOBILE!
  const { loggedin, signout } = useContext( LoginContext )
  const [ showBurgerMenu, setShowBurgerMenu ] = useState( false )
  const [ fejl, setFejl ] = useState()
  const [ loading, setLoading ] = useState()
  const [ send, setSend ] = useState()

  const handleSubmit = ( e ) => {

    e.preventDefault(); // forhindrer reload af siden 


    soegTours( e.target.search.value ).then( data => {
      setSend( data );
      setFejl( false )

      e.target.reset()

    } ).catch( err => {

      setFejl( true )
      setSend()
    } )
  }

  return (

    <nav >
      <div className="navbar" id='navbar'>

        <img src={ logo } alt="Logo" />

        <span className={ "toggle-button " + ( showBurgerMenu ? "change" : "" ) } onClick={ () => setShowBurgerMenu( !showBurgerMenu ) }>
          <span className="bar bar1"></span>
          <span className="bar bar2"></span>
          <span className="bar bar3"></span>
        </span>

        <div className={ "navbar-links " + ( showBurgerMenu ? "active" : "" ) }>
          <ul>
            <li><NavLink to="/">Om os</NavLink></li>
            <li><NavLink to="#tours">Produkter</NavLink></li>
            <li><NavLink to="#kontakt">Kontakt</NavLink></li>


            {
              //Hvis man ikke allerede er logget ind = vis login
              !loggedin &&
              <>
                <li><NavLink to="/login">Login</NavLink></li>
              </>
            }

            {
              //Hvis man allerede er logget ind = vis logud
              loggedin &&
              <>

                <li><NavLink to="/admin/home">Admin</NavLink></li>
                <button className='logud' onClick={ signout }>Log ud</button>
              </>

            }

            <li>
              <form className='search' onSubmit={ handleSubmit }>
                <input type="text" placeholder="Search" name="search" />
                <button type='submit' >search</button>
              </form>
            </li>
          </ul>
        </div>
      </div>
      {
        loading && <Loading />
      }

      {
        fejl && <Error fejlbesked={ fejl } />
      }
    </nav>
  )
}

export default Navbar