import axios from 'axios'

// BASE URL
const api = {
    baseUrl: 'http://localhost:5099/',
    imageUrl: 'http://localhost:5099/images/'
}


export let imageUrl = api.imageUrl;


// ---------- ABOUT
// -------------------------------------------------------------

// GET
export const hentAbout = () => {
    let response = axios.get( api.baseUrl + "about" )
        .then( res => { return res.data } )
        .catch( error => { return null } )
    return response;
}

// PUT
export const adminRetAbout = ( data ) => {
    const retAbout = new FormData( data )
    let response = axios.put( api.baseUrl + "about/admin/", retAbout )
        .then( res => { return res.data } )
        .catch( error => { return null } )
    return response;
}

// ---------- Tours
// -------------------------------------------------------------

// GET Teaser
export const hentToursTeaser = () => {
    let response = axios.get( api.baseUrl + "tours/teaser" )
        .then( res => { return res.data } )
        .catch( error => { return null } )
    return response;
}

// GET Tours
export const hentTours = () => {
    let response = axios.get( api.baseUrl + "tours" )
        .then( res => { return res.data } )
        .catch( error => { return null } )
    return response;
}

// GET med id 
export const hentUdvalgtTours = ( id ) => {
    let response = axios.get( api.baseUrl + "tours/" + id )
        .then( res => { return res.data } )
        .catch( error => { return null } )
    return response;
}

// Delete Tour
export const sletTours = ( id ) => {
    let response = axios.delete( api.baseUrl + "tours/admin/" + id )
        .then( res => { return res.data } )
        .catch( error => { return null } )
    return response;
}

// PUT
export const adminRetTours = ( data, id ) => {
    const retTours = new FormData( data )
    let response = axios.put( api.baseUrl + "tours/admin/" + id, retTours )
        .then( res => { return res.data } )
        .catch( error => { return null } )
    return response;
}

// POST http://localhost:5099/tours/admin
export const opretTours = ( data ) => {
    let response = axios.post( api.baseUrl + "tours/admin", data )
        .then( res => { return res.data } )
        .catch( error => { return error } )
    return response;
}

// GET http://localhost:5099/tours/soeg/søgeordher/ + id 
export const soegTours = ( soegeord ) => {
    let response = axios.get( api.baseUrl + "tours/soeg/" + soegeord )
        .then( res => { return res.data } )
    return response;
}



// ---------- KONTAKT
// -------------------------------------------------------------

// GET
export const hentKontakt = () => {
    let response = axios.get( api.baseUrl + "contactinformation" )
        .then( res => { return res.data } )
        .catch( error => { return null } )
    return response;
}

// Get Admin kontakt http://localhost:5099/contact/admin
export const hentAdminKontakt = () => {
    let response = axios.get( api.baseUrl + "contact/admin" )
        .then( res => { return res.data } )
        .catch( error => { return null } )
    return response;
}

// POST 
export const postMessage = ( data ) => {
    const besked = new FormData( data )
    let response = axios.post( api.baseUrl + "contact/", besked )
        .then( res => { return res.data } )
        .catch( error => { return null } )
    return response;
}

// DELETE
export const sletBeskeder = ( id ) => {
    let response = axios.delete( api.baseUrl + "contact/admin/" + id )
        .then( res => { return res.data } )
        .catch( error => { return null } )
    return response;
}

// ---------- FOOTER
// -------------------------------------------------------------

// GET
export const hentFooter = () => {
    let response = axios.get( api.baseUrl + "footer" )
        .then( res => { return res.data } )
    return response;
}

// ---------- LOGIN
// -------------------------------------------------------------

// POST 
export const postLogin = ( data ) => {
    const login = new FormData( data )
    let response = axios.post( api.baseUrl + "login/login", login, { withCredentials: true } )
        .then( res => { return res.data } )
        .catch( error => { return null } )
    return response;
}

// GET
export const getLogin = () => {
    let response = axios.get( api.baseUrl + "login/loggedin", { withCredentials: true } )
        .then( res => { return res.data } )
        .catch( error => { return null } )
    return response;
}

// GET
export const getLogOut = () => {
    let response = axios.get( api.baseUrl + "login/logout", { withCredentials: true } )
        .then( res => { return res.data } )
        .catch( error => { return null } )
    return response;
}