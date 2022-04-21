import React, { useState } from "react";

// CKEditor imports
import Editor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react';

//API 
import { OpretTreatments } from '../../helpers/apikald';

//Customhook som viser thumbimage
import useShowThumb from '../../hooks/useShowThumb';

const AdminOpretTour = () => {


  //States
  const [ fejl, setFejl ] = useState()
  const [ loading, setLoading ] = useState( false )
  const [ besked, setBesked ] = useState()

  //CKEditor-tekst
  const [ editortxt, setEditortxt ] = useState()

  //"state" til customhook - thumb image
  const [ thumb, makeThumb ] = useShowThumb();


  const handleSubmit = ( e ) => {

    e.preventDefault();

    // Send/post treatment til API
    const treatment = new FormData( e.target )
    // Tilføj editor-tekst fra state (som kommer fra CKEditor) i Formdata-objektet (Så det bliver sendt med til API'et)
    //treatment.append( "content", editortxt )

    setLoading( true )

    // Send treatment til apikalds filen
    OpretTreatments( treatment ).then( res => {

      if ( res ) {
        // Data
        setBesked( "ny er oprettet", res )
        setFejl( false )

        //Tøm formularen
        e.target.reset();
        // Tøm editor efter brug
        setEditortxt( "" );

      } else {
        // No data
        setFejl( true )
        setBesked( res )
      }
      setLoading( false )

    } )

  }

  return (
    <div>
      <h1>Opret en ny behandling</h1>

      { besked && <h2>{ besked }</h2> }
      {
        <form onSubmit={ handleSubmit }>
          <label>
            Titel <br />
            <input type="text" name='title' />
          </label>

          <br />

          <label>
            Beskrivelse <br />
            <textarea name='content' defaultValue={ editortxt } style={ { display: "none" } } />
            <CKEditor

              editor={ Editor }
              data={ editortxt } // De data der skal være i formularen når den loader/opdaterer
              onChange={ ( event, editor ) => {
                const data = editor.getData();
                setEditortxt( data );
              } }

            />

          </label>

          <br />

          <label>
            Vælg billede <br />
            <input type="file" name="image" onChange={ ( e ) => makeThumb( e.target.files[ 0 ] ) } /> {/* Den skal kun hente det éne billede der ligger i files */ }

            {
              // Vis thumb-image med brug af custom-hoook
              thumb && <img src={ thumb } width="70" alt="Uploadet billede" />

            }
          </label>

          <br />

          <button type='submit'>Opret treatment</button>

        </form>
      }
    </div>
  )
}

export default AdminOpretTour