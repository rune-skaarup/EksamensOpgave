import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

//Henter data fra contextProvider
import { LoginContext } from '../context/LoginContext';


const Login = () => {

  const { signin, loggedin } = useContext( LoginContext )

  const handleLogin = ( e ) => {

    e.preventDefault();

    signin( e )

  }

  return (

    <div className='login'>
      <h1>Login</h1>

      {
        //Hvis man ikke er logget ind:

        !loggedin &&

        <form onSubmit={ handleLogin }>

          <label>
            Dit brugernavn:
            <input type="text" name="email" required />
          </label>

          <br /> <br />

          <label>
            Dit password:
            <input type="password" name="password" required />
          </label>

          <br /> <br />

          <button type='submit'>LOGIN</button>

        </form>
      }

      {
        //Hvis det virker og du logger ind så bliver du sendt til admin siden
        loggedin && <Navigate to="/admin/home" replace />

      }

    </div>
  )
}

export default Login