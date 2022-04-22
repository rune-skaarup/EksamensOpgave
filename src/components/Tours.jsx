import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import Loading from "../components/Loading"
import Error from '../components/Error';

//SCSS
import './Tours.scss';

//IMG
import Star from '../assets/img/redStar.png'
import close from "../assets/img/close.png"


//Modal
import Modal from "../helpers/Modal.js"

//apikald
import { imageUrl, hentTours} from '../helpers/apikald';



const Tours = () => {


    const [ teaser, setTeaser ] = useState()
    const [ fejl, setFejl ] = useState()
    const [ loading, setLoading ] = useState()
    const [ valg, setValg ] = useState()
    const [ active, setActive ] = useState( 0 )

    useEffect( () => {

        setLoading( true )
        hentTours().then( res => {

            if ( res ) {
                // Data
                setTeaser( res )
                setFejl( false )

            } else {

                // No data
                setFejl( true )
                setTeaser()
                setValg()

            }
            setLoading( false );

        } )

    }, [] )


    const rating = ( rating ) => {
        let redStar = '';
        for ( let index = 0; index < rating; index++ ) {
            redStar += `<img src=${ Star } />`

        } return redStar
    }

    const dato = { year: 'numeric', month: 'long', day: 'numeric' }

    const handleModal = ( id ) => {
        let target = document.querySelector( "#modal" );
        target.classList.toggle( "active" );
        setValg( teaser[ id ] )
        console.log( teaser[ id ] )

    }
    const toggleModal = () => {
        let target = document.querySelector( "#modal" );
        target.classList.toggle( "active" );
    }

    useEffect( () => {
        var timeout = setTimeout( () => {

            if ( active < valg.gallery.length - 1 ) {
                setActive( active + 1 )
            } else {
                setActive( 0 );
            }

        }, 2000 )
        return () => {
            clearTimeout( timeout )
        }

    }, [ active ] )

    return (
        <div className='tContainer'>
            <div className='rejsemål' >
                <h1>Rejsemål</h1>
            </div>

            {
                teaser &&
                <div className='fContainer'  >
                    { teaser.map( ( t, i ) =>
                        <div className='tours' key={ t._id }>
                            <img src={ imageUrl + "/tours/" + t.coverimage } alt="Billede af rejsemålet" />

                            <div className='tourGrid'>
                                <div className='title'>
                                    <h1>{ t.title } </h1>
                                    <h2> { new Date( t.traveldate ).toLocaleDateString( "da-DK", dato ) } </h2>
                                </div>
                                <div className='rating'>{ parse( rating( t.rating ) ) }</div>
                            </div>

                            <div className='pTag'>{ parse( t.teaser ) } </div>
                            <button onClick={ () => handleModal( i ) } id="openBtn" >læs mere</button>

                        </div>
                    ) }

                    <Modal>
                        {
                            valg &&
                            <div className='mTours'>
                                <button onClick={ toggleModal }> <img src={ close } alt="close" /> </button>

                                <h1>{ valg.title } </h1>
                                <hr className='hr1' />

                                <div className='slideshow-container'>

                                    <ul>
                                        {

                                            valg.gallery.map( ( v, i ) =>
                                                <li className={ i == active ? "active" : "" } key={ i } style={ { backgroundImage: "url(" + v + ")" } }>

                                                    <img src={ imageUrl + "/tours/" + v } alt="Billede af kunde" />

                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>

                                <h1>{ valg.title } </h1>

                                <div className='rating'>{ parse( rating( valg.rating ) ) }</div>
                                <div className="content">
                                    <h3>Du får:</h3>
                                    <div className='c1'>{ parse( valg.content ) }</div>

                                    <h3>Værelsestype</h3>
                                    <div >{ parse( valg.roomtype ) }</div>
                                </div>

                                <h2> { new Date( valg.traveldate ).toLocaleDateString( "da-DK", dato ) } </h2>
                                <hr className='hr2' />

                                <button onClick={ toggleModal }> close </button>

                            </div>

                        }

                        {
                            loading && <Loading />
                        }

                    </Modal>
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

export default Tours