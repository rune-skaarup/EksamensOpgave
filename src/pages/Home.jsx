import React from 'react'
import About from '../components/About';
import Tours from '../components/Tours';
import Kontakt from '../components/Kotankt';
import Hero from '../components/Hero';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';

import "./home.scss"

const Home = () => {
    return (
        <>
            <Hero />
            <Navbar />

            <div className="border">
                <About />
                <Tours id="tours"/>
                <Kontakt id="kontakt"/>

            </div>

            <Footer />
        </>

    )
}

export default Home