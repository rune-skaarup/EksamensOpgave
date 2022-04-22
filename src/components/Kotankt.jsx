import React, { useState, useEffect } from 'react';
import Loading from "../components/Loading"
import Error from '../components/Error';
import phone from '../assets/img/phone.png'
import envelope from '../assets/img/envelope.png'

//SCSS
import "./kontakt.scss";

// APIkald
import { hentKontakt, postMessage } from '../helpers/apikald';

const Kotankt = () => {

    const [ kontakt, setKontakt ] = useState()
    const [ fejl, setFejl ] = useState()
    const [ loading, setLoading ] = useState()
    const [ isValid, setIsValid ] = useState( false );
    const [ message, setMessage ] = useState( '' );
    const [ send, setSend ] = useState()

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validateEmail = ( event ) => {
        const email = event.target.value;
        if ( emailRegex.test( email ) ) {
            setIsValid( true );
            setMessage();
        } else {
            setIsValid( false );
            setMessage( 'Er ikke en valid email' );
        }

        if ( email === '' ) setMessage( '' );
    };

    useEffect( () => {
        setLoading( true )
        hentKontakt().then( res => {

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

    }, [] )


    const handleSubmit = ( e ) => {

        e.preventDefault(); // forhindrer reload af siden 

        postMessage( e.target ).then( data => {
            setSend( data );
            setFejl( false )

            e.target.reset()

        } ).catch( err => {
            
            setFejl( true )
            setSend()
        } )
    }


    return (
        <div className='kContainer'>
            <div className='oKontakt' >
                <h1>Kontakt</h1>
            </div>
            <div className="kontakt">

                {
                    kontakt &&

                    <div className='kontaktInformation'>
                        <h1>Kontakt information</h1>
                        <p>{ kontakt.company }</p>
                        <p>{ kontakt.address }</p>
                        <p>{ kontakt.zipcity }</p>
                        <p>{ kontakt.country }</p>
                        <p><img src={ phone } alt="Telefon" /> { kontakt.phone }</p>
                        <p><img src={ envelope } alt="email" />{ kontakt.email }</p>
                    </div>
                }

                <div className="form">
                    <h1>Skrive til os</h1>
                    <form onSubmit={ handleSubmit } className="kontaktform" >

                        { message && message }
                        
                        <input type="text" placeholder="Navn" name="name" />

                        <input type="text" placeholder="Firma" name="company" />

                        <input type="text" placeholder="Write your Email..." name="email" onChange={ validateEmail } />

                        <input type="number" placeholder="Telefon" name="phone" />

                        <textarea name="message" placeholder='besked' id="" rows="10"></textarea>

                        <button id="OptionSubmit" type='submit' > Send </button>

                    </form>

                </div>
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

export default Kotankt