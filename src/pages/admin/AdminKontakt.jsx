import React, { useState, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import Loading from "../../components/Loading"
import Error from '../../components/Error';

// APIkald
import { hentAdminKontakt, sletBeskeder } from '../../helpers/apikald';

//SCSS
import './adminkontakt.scss'

const AdminKontakt = () => {

    const [ kontakt, setKontakt ] = useState()
    const [ fejl, setFejl ] = useState()
    const [ loading, setLoading ] = useState()
    const [ besked, setBesked ] = useState()

    const dato = { year: 'numeric', month: 'long', day: 'numeric' }

    useEffect( () => {
        setLoading( true )
        hentAdminKontakt().then( res => {

            if ( res ) {
                // Data
                setKontakt( res )
                setFejl( false )
            } else {
                // No data
                setFejl( true )
                setKontakt()
            }
            setLoading( false );

        } )

    }, [ besked ] )


    const handleSlet = ( id ) => {

        //Hvor confirm er true så sletter den
        if ( window.confirm( "Vil du slette?" ) === true ) {

            setLoading( true )

            sletBeskeder( id ).then( res => {

                if ( res ) {
                    // Data
                    setBesked( "Du har nu slettet en besked med ID" + id, res )

                } else {
                    // No data
                    setBesked( "Noget gik glat med at slette", res )
                }


            } )
        }
    }

    const valthis = () => {
        var checkBox = document.getElementsByClassName( 'check' );
        var isChecked = false;
        for ( var i = 0; i < checkBox.length;) {
            if ( checkBox[ i ].checked ) {
                isChecked = true;
            };
        };
        if ( isChecked ) {
            alert( 'At least one checkbox checked!' );
        } else {
            alert( 'Please, check at least one checkbox!' );
        }
    }

    return (
        <div className='kontakt'>
            <div>
                {
                    <div className='kontaktBeskeder'>

                        {
                            kontakt?.map( ( k, i ) =>

                                <div key={ i } className="beskedArea">
                                    <div className='info'>
                                        <h1>Kunde besked</h1>

                                        <p> <span>ID: </span> { k._id }</p>
                                        <p><span>Navn: </span> { k.name }</p>
                                        <p><span>Firma:</span>  { k.company }</p>
                                        <p><span>Email:</span>  { k.email }</p>
                                        <p><span>Telefon:</span>  { k.phone }</p>
                                        <p><span>Besked:</span>  { k.message }</p>
                                        <p><span>Modtaget:</span>  { new Date( k.received ).toLocaleDateString( "da-DK", dato ) }</p>

                                    </div>
                                    <form action="">
                                        <input type="checkbox" className="check" required />
                                        <button className="icon"> <AiFillDelete  onClick={ () => handleSlet( k._id, valthis())} /> </button>
                                    </form>
                                </div>

                            )
                        }
                    </div>
                }
            </div>


            {
                loading && <Loading />
            }

            {
                fejl && <Error fejlbesked={ fejl } />
            }
        </div>
    )
}

export default AdminKontakt