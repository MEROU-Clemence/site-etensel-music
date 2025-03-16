document.addEventListener('DOMContentLoaded', function () {
    // ****** Nav
    // Mobile Nav
    var MobNav = $('.navbar-toggler');
    MobNav.on('click', function () {
        $('.navbar-toggler .btn-menu').toggleClass('d-none');
        $('.nav-mobile').toggleClass('nav-mobile-active');
    });

    // ****** Pour transtion fluide vers les links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // ****** Slider Videos
    const CaroS = document.querySelector('.Carousel-slider');
    const CaroSlider = new MicroSlider(CaroS, { indicators: true, indicatorText: '' });
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');

    // Écouteurs d'événements pour avancer/reculer
    prevButton.addEventListener('click', () => {
        CaroSlider.prev();
    });

    nextButton.addEventListener('click', () => {
        CaroSlider.next();
    });

    // Gestion du clic sur les slides (ouvrir un lien si nécessaire)
    let slideLinks = document.querySelectorAll('.slider-item');
    if (slideLinks.length > 0) {
        slideLinks.forEach(el =>
            el.addEventListener('click', e => {
                e.preventDefault();
                let href = el.dataset.href;
                let target = el.dataset.target || '_self';
                if (href !== '#') window.open(href, target);
            })
        );
    }
});