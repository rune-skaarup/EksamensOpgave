import React, { useEffect, useState } from "react";

import Loading from "../../components/Loading"
import Error from '../../components/Error';

//apikald
import { adminRetFooter, hentFooter, adminRetKontakt, hentKontakt } from '../../helpers/apikald';

//SCSS
import './adminFooter.scss'


const AdminFooter = () => {

    //STATE
    const [ kontakt, setKontakt ] = useState() //About der skal rettes   
    const [ footer, setFooter ] = useState() //Footer der skal rettes   
    const [ fejl, setFejl ] = useState()
    const [ loading, setLoading ] = useState( false )
    const [ besked, setBesked ] = useState()
    const [ besked2, setBesked2 ] = useState()


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
            setLoading( false )
        } )
    }, [ besked2 ] )

    const handleSubmit2 = ( e ) => {

        e.preventDefault();

        setLoading( true )

        adminRetKontakt( e.target ).then( res => {

            if ( res ) {
                // Data
                setBesked2( "Kontakt information med er rettet", res )
                setFejl( false )

            } else {
                // No data
                setFejl( true )
                setBesked2( res )
            }
            setLoading( false )

        } )
    }

    useEffect( () => {
        setLoading( true )
        hentFooter().then( res => {

            if ( res ) {
                // Data
                setFooter( res )
                setFejl( false )
            } else {
                // No data
                setFejl( true )
                setFooter()
            }

            setLoading( false )
        } )
    }, [ besked ] )

    const handleSubmit = ( e ) => {

        e.preventDefault();

        setLoading( true )

        // Send About til apikalds filen
        adminRetFooter( e.target ).then( res => {

            if ( res ) {
                // Data
                setBesked( "Footer med er rettet", res )
                e.target.reset() // nulstil formularen
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
        <div className="retFooter">

            <h1>Ret Footer</h1>
            { besked && <h2>{ besked }</h2> }
            {
                footer &&

                <form onSubmit={ handleSubmit }>
                    <label>
                        <h2>Footer text</h2>
                        <input type="text" name='footertext' defaultValue={ footer.footertext } />
                    </label>

                    <br />

                    <button type='submit'>Ret Footer</button>

                </form>
            }

            <h1>Ret Kontaktinformationen</h1>
            { besked2 && <h2>{ besked2 }</h2> }
            {
                kontakt &&

                <form onSubmit={ handleSubmit2 }>

                    <label>
                        <h2>Firma navn</h2>
                        <input type="text" name='company' defaultValue={ kontakt.company } />
                    </label>

                    <br />
                    <label>
                        <h2>Adresse</h2>
                        <input type="text" name='address' defaultValue={ kontakt.address } />
                    </label>

                    <br />
                    <label>
                        <h2>Postnummer</h2>
                        <input type="text" name='zipcity' defaultValue={ kontakt.zipcity } />
                    </label>

                    <br />

                    <label>
                        <h2>Land</h2>
                        <input type="text" name='country' defaultValue={ kontakt.country } />
                    </label>

                    <br />
                    
                    <label>
                        <h2>telefon nummer</h2>
                        <input type="nummer" name='phone' defaultValue={ kontakt.phone } />
                    </label>

                    <br />
                    <label>
                        <h2>Firma email</h2>
                        <input type="text" name='email' defaultValue={ kontakt.email } />
                    </label>

                    <br />


                    <button type='submit'>Ret Kontaktinformationen</button>

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

export default AdminFooter