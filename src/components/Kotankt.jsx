import React, { useState, useEffect } from 'react';
import Loading from "../components/Loading"
import Error from '../components/Error';
import phone from '../assets/img/phone.png'
import envelope from '../assets/img/envelope.png'

//SCSS
import "./kontakt.scss";

//Modal
import AfmeldModal from "../helpers/AfmeldModal.js"

// APIkald
import { hentKontakt, postMessage, postNews, sletTilmelding } from '../helpers/apikald';

const Kotankt = () => {

    const [ kontakt, setKontakt ] = useState();
    const [ fejl, setFejl ] = useState();
    const [ loading, setLoading ] = useState();
    const [ isValid, setIsValid ] = useState( false );
    const [ message, setMessage ] = useState( '' );
    const [ message2, setMessage2 ] = useState( '' );
    const [ message3, setMessage3 ] = useState( '' );
    const [ send, setSend ] = useState();
    const [ besked, setBesked ] = useState()

    const [ news, setNews ] = useState()



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

    const validateEmail2 = ( event ) => {
        const email = event.target.value;
        if ( emailRegex.test( email ) ) {
            setIsValid( true );
            setMessage2();
        } else {
            setIsValid( false );
            setMessage2( 'Er ikke en valid email' );
        }

        if ( email === '' ) setMessage2( '' );
    };

    const validateEmail3 = ( event ) => {
        const email = event.target.value;
        if ( emailRegex.test( email ) ) {
            setIsValid( true );
            setMessage2();
        } else {
            setIsValid( false );
            setMessage3( 'Er ikke en valid email' );
        }

        if ( email === '' ) setMessage3( '' );
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

    //Handle kontakt
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

    //Handle News
    const handleSubmit2 = ( e ) => {
        e.preventDefault(); // forhindrer reload af siden 

        postNews( e.target ).then( data => {
            setNews( data );
            setFejl( false )

            e.target.reset()

        } ).catch( err => {

            setFejl( true )
            setNews()
        } )
    }

    const handleSlet = ( id ) => {

        //Hvor confirm er true så afmelder den
        if ( window.confirm( "Vil du afmelde?" ) === true ) {

            setLoading( true )

            sletTilmelding( id ).then( res => {

                if ( res ) {
                    // Data
                    setBesked( res )

                } else {
                    // No data
                    setBesked( "Noget gik glat med at afmelde", res )
                }


            } )
        }
    }

    const handleModal = ( id ) => {
        let target = document.querySelector( "#aMModal" );
        target.classList.toggle( "active" );

    }
    const toggleModal = () => {
        let target = document.querySelector( "#aMModal" );
        target.classList.toggle( "active" );
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


                <div>
                    <h1>Tilmeld Nyhedsbrev</h1> <br />
                    <form onSubmit={ handleSubmit2 } className="NewsForm" >
                        { message2 && <h3>{ message2 }</h3> }

                        <input type="text" name='email' placeholder="Email" onChange={ validateEmail2 } /> <br />
                        <input type="text" name='name' placeholder='Navn' /> <br />
                        <button id="OptionSubmit" type='submit'> Tilmeld </button>

                        <button onClick={ handleModal } id="openBtn" >Afmeld</button>
                    </form>




                    <AfmeldModal>
                        <form onSubmit={ handleSlet } className="NewsFormSlet" >
                            { message3 && <h3>{ message3 }</h3> }

                            <input type="text" name='email' placeholder=" Afmeld nyhedsbrev" onChange={ validateEmail3 } />

                            <button id="OptionSubmit" type='submit'> Afmeld </button>


                        </form>
                        <button onClick={ toggleModal } id="close"> close </button>
                    </AfmeldModal>


                </div>

                <div className="form">
                    <h1>Skrive til os</h1>
                    <form onSubmit={ handleSubmit } className="kontaktform" >

                        { message && <h3>{ message }</h3> }

                        <input type="text" placeholder="Navn" name="name" />

                        <input type="text" placeholder="Firma" name="company" />

                        <input type="text" placeholder="Write your Email..." name="email" onChange={ validateEmail } />

                        <input type="number" placeholder="Telefon" name="phone" />

                        <textarea name="message" placeholder='besked' id="" ></textarea>

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