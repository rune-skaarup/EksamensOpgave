import React, { useState } from "react";
import Loading from "../../components/Loading"
import Error from '../../components/Error';

// CKEditor imports
import Editor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react';

//API 
import { postTours } from '../../helpers/apikald';

//Customhook som viser thumbimage
import useShowThumb from '../../hooks/useShowThumb';

//SCSS
import './adminOpretTour.scss'

const AdminOpretTour = () => {


  //States
  const [ fejl, setFejl ] = useState()
  const [ loading, setLoading ] = useState( false )
  const [ besked, setBesked ] = useState()

  //CKEditor-tekst
  const [ editortxt, setEditortxt ] = useState()
  const [ editortxt2, setEditortxt2 ] = useState()
  const [ editortxt3, setEditortxt3 ] = useState()

  //"state" til customhook - thumb image
  const [ thumb, makeThumb ] = useShowThumb();
  const [ thumbs, makeThumbs ] = useShowThumb();


  /* const handleSubmit = ( e ) => {
     e.preventDefault();
 
     setLoading( true )
 
          postTours( e.target ).then( res => {
     
           if ( res ) {
             // Data
             setBesked( "ny er oprettet", res )
             setFejl( false )
     
             //Tøm formularen
             e.target.reset();
     
             setEditortxt( "" );
             setEditortxt2( "" );
             setEditortxt3( "" );
     
           } else {
             // No data
             setFejl( true )
             setBesked( res )
           }
           setLoading( false )
     
         } )
     
       } */



  /*   const handleSubmit = ( e ) => {
  
      e.preventDefault(); // forhindrer reload af siden 
  
      postTours( e.target ).then( data => {
        setFejl( false )
  
        e.target.reset()
  
        setEditortxt( "" );
        setEditortxt2( "" );
        setEditortxt3( "" );
  
      } ).catch( err => {
  
        setFejl( true )
  
      } )
    }
   */

  const handleSubmit = ( e ) => {

    e.preventDefault();
    setLoading( true )

    postTours( e.target ).then( res => {

      if ( res ) {
        setBesked( "ny er oprettet", res )
        setFejl( false )

        e.target.reset();

        setEditortxt( "" );
        setEditortxt2( "" );
        setEditortxt3( "" );

      } else {

        setFejl( true )
        setBesked( res )
      }
      setLoading( false )

    } )

  }




  return (
    <div className="opretTour">
      <h2>Opret en ny Tour</h2>

      { besked && besked }

      {
        <form onSubmit={ handleSubmit }>

          <label>
            <h1>Titel</h1>
            <input type="text" name='title' />
          </label>

          <label>
            <h1>teaser</h1>
            <textarea name='teaser' defaultValue={ editortxt } style={ { display: "none" } } />
            <CKEditor
              editor={ Editor }
              data={ editortxt }
              onReady={ ( editor ) => setEditortxt( editor.getData() ) }
              onChange={ ( event, editor ) => {
                const data = editor.getData();
                setEditortxt( data );
              }
              }
            />
          </label>

          <label>
            <h1>content</h1>
            <textarea name='content' defaultValue={ editortxt2 } style={ { display: "none" } } />
            <CKEditor
              editor={ Editor }
              data={ editortxt2 }
              onReady={ ( editor ) => setEditortxt2( editor.getData() ) }
              onChange={ ( event, editor ) => {
                const data = editor.getData();
                setEditortxt2( data );
              }
              }
            />
          </label>

          <label>
            <h1>roomtype</h1>
            <textarea name='roomtype' defaultValue={ editortxt3 } style={ { display: "none" } } />

            <CKEditor
              editor={ Editor }
              data={ editortxt3 }
              onReady={ ( editor ) => setEditortxt3( editor.getData() ) }
              onChange={ ( event, editor ) => {
                const data = editor.getData();
                setEditortxt3( data );
              }
              }
            />
          </label>

          <label>
            <h1>traveldate</h1>
            <input type="date" name='traveldate' min="2022-01-01" />
          </label>

          <label>
            <h1>rating </h1>
            <input type="number" name='rating' max="5" min="1" />
          </label>

          <label>
            <h1>gallery</h1>
            <input type="file" name='gallery' multiple onChange={ ( e ) => makeThumb( e.target.files[ 0 ] ) } />
            {

              thumb && <img src={ thumb } width="100" alt="Uploadet billede" />

            }
          </label>

          <label>
            <h1>Vælg nyt billede </h1>
            <input type="file" name="coverimage" onChange={ ( e ) => makeThumbs( e.target.files[ 0 ] ) } />

            {

              thumbs && <img src={ thumbs } width="100" alt="Uploadet billede" />

            }

          </label>


          <br />

          <button type='submit'> Opret tours</button>

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

export default AdminOpretTour