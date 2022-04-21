import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import Loading from "../components/Loading"
import Error from '../components/Error';

//SCSS
import './Tours.scss';

//IMG
import Star from '../assets/img/redStar.png'
import Formel from '../assets/img/f1.jpg'
import close from "../assets/img/close.png"


//Modal
import Modal from "../helpers/Modal.js"

//Import slider
//import { showSlides, currentSlide, pauseSlideshow } from "../helpers/slider"
//import 'react-slideshow-image/dist/styles.css'
//import { Slide } from 'react-slideshow-image';

//apikald
import { imageUrl, hentTours } from '../helpers/apikald';



const Tours = () => {


    const [ teaser, setTeaser ] = useState()
    const [ fejl, setFejl ] = useState()
    const [ loading, setLoading ] = useState()
    const [ valg, setValg ] = useState()

    useEffect( () => {

        setLoading( true )
        hentTours().then( res => {

            if ( res ) {
                // Data
                setTeaser( res )
                setValg()
                //Start show
                //  showSlides();

                setFejl( false )
            } else {
                // No data
                setFejl( true )
                setTeaser()
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

                                <img src={ Formel } id="dummy" alt="dummy" />
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

                                {/*                                 <div className="slideshow-container">
                                    {
                                        // map mySlides/slides ud - 1 slide for hver data
                                        <div className="mySlides">
                                            { valg.gallery.map( ( v, i ) =>
                                                <img src={ imageUrl + "tours/" + v } key={ i } alt="Billede af rejsemålet" />
                                            ) }
                                        </div>

                                    }
                                </div> */}
                                {/*                                 <div className="slide-container">
                                    <Slide arrows={ true } indicators={ true } duration={ 5000 }>
                                        { valg.gallery.map( ( v, i ) =>
                                            <div className="each-slide" key={ i }>
                                                <img src={ imageUrl + "/tours/" + v } key={ i } alt="Billede af rejsemålet" />
                                            </div>
                                        ) }
                                    </Slide>
                                </div> */}
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