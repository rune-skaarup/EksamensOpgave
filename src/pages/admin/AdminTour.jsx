import React, { useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { Link } from "react-router-dom";
import Loading from "../../components/Loading"
import Error from '../../components/Error';


import "./admintours.scss"

import { hentTours, sletTours, imageUrl } from '../../helpers/apikald';


const AdminTour = () => {

    const [ tours, setTours ] = useState()
    const [ fejl, setFejl ] = useState()
    const [ loading, setLoading ] = useState( false )
    const [ besked, setBesked ] = useState()

    useEffect( () => {

        setLoading( true )

        hentTours().then( res => {

            if ( res ) {
                // Data
                setTours( res )
                setFejl( false )
            } else {
                // No data
                setFejl( true )
                setTours()
            }

            console.log( res )
            setLoading( false )
        } )

    }, [ besked ] )

    const handleSlet = ( id ) => {

        //Hvor confirm er true så sletter den
        if ( window.confirm( "Vil du slette?" ) === true ) {

            setLoading( true )

            sletTours( id ).then( res => {

                if ( res ) {
                    // Data
                    setBesked( "Du har nu slettet en tour med ID" + id, res )

                } else {
                    // No data
                    setBesked( "Noget gik glat med at slette", res )
                }


            } )
        }
    }

    return (
        <div className="admintours">

            {
                tours &&

                <table>
                    <thead>
                        <tr>
                            <th colSpan="2"></th>
                            <th colSpan="2"><Link to="/admin/adminOpretTour"> Opret ny </Link></th>
                        </tr>
                        <tr>
                            <th>Billede</th>
                            <th>Navn</th>
                            <th>Ret</th>
                            <th>Slet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tours.map( t =>
                                <tr key={ t._id }>
                                    <td><img src={ imageUrl + "/tours/" + t.coverimage } alt="billede af behandling" /></td>
                                    <td className="title">{ t.title }</td>
                                    <td className="icon"> <Link to={ "/admin/adminRetTour/" + t._id }> <AiFillEdit /> </Link></td>
                                    <td className="icon"> <AiFillDelete onClick={ () => handleSlet( t._id ) } /> </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
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

export default AdminTour