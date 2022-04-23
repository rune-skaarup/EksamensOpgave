import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';

import Loading from "../components/Loading"
import Error from '../components/Error';


//apikald
import { hentFooter } from '../helpers/apikald';

//SCSS
import "./footer.scss"

const Footer = () => {

  const [ footer, setFooter ] = useState()
  const [ fejl, setFejl ] = useState()
  const [ loading, setLoading ] = useState()

  useEffect( () => {
    setLoading( true )
    hentFooter().then( res => {

      if ( res ) {
        // Data
        setFooter( res.footertext.replace( "FTA Travels", "<span>FTA Travels</span>" ) )
        setFejl( false )
      } else {
        // No data
        setFejl( true )
        setFooter()
      }
      setLoading( false );

    } )

  }, [] )

  return (
    <div className='footer'>
      {
        footer &&

        <h5> &copy; { parse( footer ) }</h5>

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

export default Footer