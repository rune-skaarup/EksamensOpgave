import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

// CKEditor imports
import Editor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react';

import { adminRetTours, hentUdvalgtTours, imageUrl } from '../../helpers/apikald';

//Customhook som viser thumbimage
import useShowThumb from '../../hooks/useShowThumb';

//SCSS
import './adminrettours.scss'


const AdminRetTour = () => {

    //Snup ud fra url'en - så vi ved hvilken tour der skal indlæses i formularen/rettes
    const { id } = useParams();
    console.log( id )

    //STATE
    const [ tours, setTours ] = useState() //Tours der skal rettes   
    const [ fejl, setFejl ] = useState()
    const [ loading, setLoading ] = useState( false )
    const [ besked, setBesked ] = useState()

    //CKEditor-tekst
    const [ editortxt, setEditortxt ] = useState()

    //"state" til customhook - thumb image
    const [ thumb, makeThumb ] = useShowThumb();

    // Kald api'et og hent den treatment (ud fra id) som skal rettes
    useEffect( () => {
        setLoading( true )

        hentUdvalgtTours( id ).then( res => {

            if ( res ) {
                // Data
                setTours( res )
                setFejl( false )
            } else {
                // No data
                setFejl( true )
                setTours()
            }

            console.log( res )
            setLoading( false )
        } )
    }, [ besked ] )



    const handleSubmit = ( e ) => {

        e.preventDefault();
        setLoading( true )

        // Send treatment til apikalds filen
        adminRetTours( e.target, id ).then( res => {

            if ( res ) {
                // Data
                setBesked( "Tours med er rettet", res )
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
        <div className="retTour">
            <h2>ret tour { id }</h2>
            { besked && <h2>{ besked }</h2> }
            {
                tours &&

                <form onSubmit={ handleSubmit }>
                    <label>
                        <h1>Titel</h1>
                        <input type="text" name='title' defaultValue={ tours.title } />
                    </label>

                    <label>
                        <h1>teaser</h1>
                        <textarea name='teaser' defaultValue={ editortxt } style={ { display: "none" } } />
                        <CKEditor
                            editor={ Editor }
                            data={ tours.teaser } // De data der skal være i formularen når den loader/opdaterer
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
                        <textarea name='content' defaultValue={ editortxt } style={ { display: "none" } } />
                        <CKEditor
                            editor={ Editor }
                            data={ tours.content } // De data der skal være i formularen når den loader/opdaterer
                            onReady={ ( editor ) => setEditortxt( editor.getData() ) }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setEditortxt( data );
                            }
                            }

                        />
                    </label>
                    <label>
                        <h1>roomtype</h1>
                        <textarea name='roomtype' defaultValue={ editortxt } style={ { display: "none" } } />

                        <CKEditor
                            editor={ Editor }
                            data={ tours.roomtype } // De data der skal være i formularen når den loader/opdaterer
                            onReady={ ( editor ) => setEditortxt( editor.getData() ) }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setEditortxt( data );
                            }
                            }
                        />
                    </label>
                    <label>
                        <h1>traveldate</h1>
                        <input type="date" name='traveldate' defaultValue={ tours.traveldate } />
                    </label>
                    <label>
                        <h1>rating </h1>
                        <input type="number" name='rating' max="5" min="1" defaultValue={ tours.rating } />
                    </label>

                    <label>
                        <h1>gallery</h1>
                        <input type="file" name='gallery' multiple />
                    </label>

                    {
                        // Vis thumb-image med brug af custom-hoook
                        thumb && <img src={ thumb } width="100" alt="Uploadet billede" />

                    }

                    <div>
                        <h3>Nuværende billede</h3>
                        <div className="gallery">

                            { tours.gallery.map( ( v, i ) =>

                                <img src={ imageUrl + "tours/" + v } key={ i } height="120px" alt="Billede af rejsemålet" />

                            ) }
                        </div>
                    </div>

                    <label>
                        <h1>Vælg nyt billede </h1>
                        <input type="file" name="coverimage" onChange={ ( e ) => makeThumb( e.target.files[ 0 ] ) } /> {/* Den skal kun hente det éne billede der ligger i files */ }
                    </label>

                    {
                        // Vis thumb-image med brug af custom-hoook
                        thumb && <img src={ thumb } width="100" alt="Uploadet billede" />

                    }

                    <div>
                        <h3>Nuværende billede</h3>
                        <img src={ imageUrl + "/tours/" + tours.coverimage } alt="Nuværende billede" width="300" />
                    </div>



                    <br />

                    <button type='submit'> ret tours</button>

                </form>
            }

            {
                loading && <h1>Loading...</h1>
            }

            {
                fejl && <h1>Der er opstået en fejl</h1>
            }
        </div>
    )
}

export default AdminRetTour