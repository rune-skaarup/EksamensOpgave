import React, { useState, useEffect } from 'react';

import Loading from "../components/Loading"
import Error from '../components/Error';


//SCSS
import "./aMModal.scss"

const AfmeldModal = ( { children } ) => {

    const [ fejl, setFejl ] = useState()
    const [ loading, setLoading ] = useState()

    return (
        <div id="aMModal" >
            <div className='aMContainer'>

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

export default AfmeldModal