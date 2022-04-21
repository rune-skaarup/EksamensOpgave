// https://www.w3schools.com/howto/howto_js_slideshow.asp

let slideIndex = 0; // Styrer hvilket slide/img der skal vises (0 = det første slide)
let i;
let slides = document.getElementsByClassName( "mySlides" );
let dots = document.getElementsByClassName( "dot" );
let t; // Styrer timeOut (så den kan nulstilles når der er ændringer)

//showSlides( slideIndex );

// Dots image controls - n er det tal (0, 1, 2 osv.) som dot'en sender med = det image (index som skal vises)
//Hvis dot sender "1" med - så skal slide/image med index = 1
export const currentSlide = ( n ) => {
    clearTimeout(t) // Slet timeout - så der kan starte en ny timeout
    slideIndex = n
    showSlides();
}

export const pauseSlideshow = () => {
    clearTimeout(t);
}

export const showSlides = () => {
        clearTimeout(t);

    if ( slideIndex > slides.length - 1 ) { slideIndex = 0 } // Starter forfra ved 0

    for ( i = 0; i < slides.length; i++ ) {
        slides[ i ].style.display = "none";
    }
    for ( i = 0; i < dots.length; i++ ) {
        dots[ i ].className = dots[ i ].className.replace( " active", "" );
    }

    slides[ slideIndex ].style.display = "block";
   // dots[ slideIndex ].className += " active";

    //Vis nsæste slide/image (= læg 1 til slideIndex)
    slideIndex++ // Samme som slideIndex = slideIndex + 1

    t = setTimeout(showSlides, 2000);
}