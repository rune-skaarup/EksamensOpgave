import React, { useState, useEffect } from 'react';

import Loading from "../components/Loading"
import Error from '../components/Error';

//SCSS
import "./modal.scss";

const Modal = ( { children } ) => {

    const [ fejl, setFejl ] = useState()
    const [ loading, setLoading ] = useState()


    return (
        <div id="modal" >
            <div className='mContainer'>
                

                { children }
               
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

export default Modal