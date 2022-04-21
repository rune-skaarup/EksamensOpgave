import React, { useEffect, useState } from "react";

import Loading from "../../components/Loading"
import Error from '../../components/Error';

// CKEditor imports
import Editor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react';

import { adminRetAbout, hentAbout, imageUrl } from '../../helpers/apikald';

//Customhook som viser thumbimage
import useShowThumb from '../../hooks/useShowThumb';

//SCSS
import './adminabout.scss';


const AdminAbout = () => {

  //STATE
  const [ about, setAbout ] = useState() //Treatments der skal rettes   
  const [ fejl, setFejl ] = useState()
  const [ loading, setLoading ] = useState( false )
  const [ besked, setBesked ] = useState()

  //CKEditor-tekst
  const [ editortxt, setEditortxt ] = useState()

  //"state" til customhook - thumb image
  const [ thumb, makeThumb ] = useShowThumb();

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

      console.log( res )
      setLoading( false )
    } )
  }, [ besked ] )

  const handleSubmit = ( e ) => {

    e.preventDefault();

    setLoading( true )

    // Send treatment til apikalds filen
    adminRetAbout( e.target ).then( res => {

      if ( res ) {
        // Data
        setBesked( "About med er rettet", res )
        e.target.reset() // nulstil formularen
        makeThumb(); // Tøm thumb for indhold(img'et)
        setFejl( false )

      } else {
        // No data
        setFejl( true )
        setBesked( res )
      }
      setLoading( false )

    } )
  }

  return (
    <div className="retAbout">
      <h1>ret about</h1>
      { besked && <h2>{ besked }</h2> }
      {
        about &&

        <form onSubmit={ handleSubmit }>
          <label>
            <h2>Titel</h2>
            <input type="text" name='title' defaultValue={ about.title } />
          </label>

          <br />

          <label>
            <h2>Beskrivelse </h2>
            <textarea name='content' defaultValue={ editortxt } style={ { display: "none" } } />

            <CKEditor
              editor={ Editor }
              data={ about.content } // De data der skal være i formularen når den loader/opdaterer
              onReady={ ( editor ) => setEditortxt( editor.getData() ) }
              onChange={ ( event, editor ) => {
                const data = editor.getData();
                setEditortxt( data );
              }
              }

            />

          </label>

          <br />

          <div>
            <h2>Nuværende billede</h2>
            <img src={ imageUrl + "/about/" + about.image } alt="Nuværende billede" width="300" />
          </div>

          <label>
            <h4>Vælg nyt billede</h4>
            <input type="file" name="image" onChange={ ( e ) => makeThumb( e.target.files[ 0 ] ) } /> {/* Den skal kun hente det éne billede der ligger i files */ }

            {
              // Vis thumb-image med brug af custom-hoook
              thumb && <img src={ thumb } width="150" alt="Uploadet billede" />

            }

          </label>

          <br />

          <button type='submit'>Ret treatment</button>

        </form>
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

export default AdminAbout