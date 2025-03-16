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
});