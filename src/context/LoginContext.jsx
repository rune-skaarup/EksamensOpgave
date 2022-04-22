import { useState, createContext } from 'react';
import { postLogin, getLogin, getLogOut } from '../helpers/apikald';

import { Navigate, useNavigate } from 'react-router-dom';

export const LoginContext = createContext()

const LoginContextProvider = ( props ) => {

    const [ loggedin, setLoggedin ] = useState()

    //LOGIN metode
    let signin = ( e ) => {

        postLogin( e.target ).then( res => {

            if ( res ) {
                setLoggedin( true )

            } else {
                setLoggedin( false )
                console.log( 'fejl' )
            }
        } )
    };

    let Navigate = useNavigate();
    // callback, LOGUD metode
    let signout = () => {
        getLogOut().then( res => {
            if(res) {
                
                Navigate("/", {replace: true} )
                console.log("logout")
            }
        })
    };

    let isLoggin = () => {
        getLogin().then( res => {

            if ( res ) {
                setLoggedin( true )

            } else {
                setLoggedin( false )
                console.log( 'fejl' )
            }
        } )
    }

    isLoggin()

    return (
        <LoginContext.Provider value={ { loggedin, signin, signout } }>
            { props.children }
        </LoginContext.Provider>
    )
};
export default LoginContextProvider;