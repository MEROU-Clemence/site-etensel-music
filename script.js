document.addEventListener('DOMContentLoaded', function () {
    // ****** Nav
    // Mobile Nav
    var MobNav = $('.navbar-toggler');
    MobNav.on('click', function () {
        $('.navbar-toggler .btn-menu').toggleClass('d-none');
        $('.nav-mobile').toggleClass('nav-mobile-active');
    });
});