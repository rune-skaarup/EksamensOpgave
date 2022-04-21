import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import Loading from "../components/Loading"
import Error from '../components/Error';
import './about.scss';

import { hentAbout, imageUrl } from '../helpers/apikald';


const About = () => {


  const [ about, setAbout ] = useState()
  const [ fejl, setFejl ] = useState()
  const [ loading, setLoading ] = useState()

  useEffect( () => {

    setLoading( true )
    hentAbout().then( res => {

      if ( res ) {
        // Data
        setAbout( res )
        setFejl( false )
      } else {
        // No data
        setFejl( true )
        setAbout()
      }
      setLoading( false );

    } )

  }, [] )

  return (

    <div className='aContainer'>
          <div className='omOs' >
            <h1>Om os</h1>
          </div>

      {
        about &&

        <div className='about'>


          <p>{ parse( about.content ) }</p>
          <img src={ imageUrl + "/about/" + about.image } alt="billede af en bus" />
        </div>
      }



      {
        loading && <Loading />
      }

      {
        fejl && <Error fejlbesked={ fejl } />
      }


    </div>




  )

}

export default About