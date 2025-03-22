document.addEventListener('DOMContentLoaded', function () {
  // ****** Nav
  // Mobile Nav
  var MobNav = $('.navbar-toggler');
  MobNav.on('click', function () {
      $('.navbar-toggler .btn-menu').toggleClass('d-none');
      $('.nav-mobile').toggleClass('nav-mobile-active');
  });

  // ****** Pour transition fluide vers les links
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

  // Fonction pour mettre en pause toutes les vidéos
  function pauseAllVideos() {
      const videos = document.querySelectorAll('.Carousel-slider video');
      videos.forEach((video) => video.pause());
  }

  // Fonction pour jouer une vidéo lorsqu'on clique dessus
  function enableVideoClickPlay() {
      const videos = document.querySelectorAll('.Carousel-slider video');
      videos.forEach((video) => {
          video.addEventListener('click', function () {
              if (video.paused) {
                  pauseAllVideos(); // Mettre en pause toutes les autres vidéos
                  video.play(); // Jouer la vidéo cliquée
              } else {
                  video.pause(); // Si déjà en lecture, mettre en pause
              }
          });
      });
  }

  // Écouteurs pour avancer/reculer dans le slider avec flèches
  prevButton.addEventListener('click', () => {
      pauseAllVideos();
      CaroSlider.prev();
  });

  nextButton.addEventListener('click', () => {
      pauseAllVideos();
      CaroSlider.next();
  });

  // Initialisation
  enableVideoClickPlay();
  pauseAllVideos();

  // Assurez-vous que la vidéo commence à 0.5 secondes pour éviter l'écran noir
  document.querySelectorAll('.Carousel-slider video').forEach((video) => {
      video.currentTime = 0.5;
      video.addEventListener('loadeddata', () => {
          video.pause();
      });
  });

  // ****** Pour vidéo solo
  document.querySelectorAll('.slider-item').forEach((sliderItem) => {
      const video = sliderItem.querySelector('video');
      const playIcon = sliderItem.querySelector('.icon-play');

      playIcon.addEventListener('click', () => {
          if (!sliderItem.classList.contains('is-playing')) {
              video.play(); // Lire la vidéo
              sliderItem.classList.add('is-playing');
          } else {
              video.pause(); // Mettre en pause si déjà en lecture
              sliderItem.classList.remove('is-playing');
          }
      });

      // Optionnel : si l'utilisateur clique sur la vidéo elle-même
      video.addEventListener('click', () => {
          if (!sliderItem.classList.contains('is-playing')) {
              video.play();
              sliderItem.classList.add('is-playing');
          } else {
              video.pause();
              sliderItem.classList.remove('is-playing');
          }
      });
  });

  // Assurez-vous que la vidéo commence à 0.5 secondes pour éviter l'écran noir
  document.querySelectorAll('.video-solo video').forEach((video) => {
      video.currentTime = 0.5;
      video.addEventListener('loadeddata', () => {
          video.pause();
      });
  });

  // ****** Pour la modale
  // Vérifier si un message est présent dans la modale et l'afficher
  var modalMessage = document.getElementById("modal-message") ? document.getElementById("modal-message").innerText : "";
  if (modalMessage) {
      document.getElementById("myModal").style.display = "block"; // Afficher la modale
  }

  // Fermer la modale en cliquant sur (x)
  document.querySelector('.close').onclick = function() {
      document.getElementById("myModal").style.display = "none";
  }

  // Fermer la modale en cliquant en dehors de celle-ci
  window.onclick = function(event) {
      if (event.target == document.getElementById("myModal")) {
          document.getElementById("myModal").style.display = "none";
      }
  }

  // ****** Fonction de redirection vers la page d'accueil
  function redirectToHome() {
      window.location.href = 'index.html'; // Rediriger vers la page d'accueil
  }

  // Ajoute l'écouteur de clic pour le bouton de redirection (si ajouté à la modale)
  const redirectButton = document.getElementById('modal-button');
  if (redirectButton) {
      redirectButton.addEventListener('click', redirectToHome);
  }
});
