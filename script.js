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

    // ****** Fonction pour Calendrier switch sur les mois d'après
    const datesCalendar = document.querySelector('.dates-calendar');
    const currentMonthSpan = document.querySelector('.month-calendar span'); // Pour afficher le mois actuel
    let currentMonth = 4; // Avril (mois indexé de 0 à 11, avril = 4)
    let currentYear = 2025;

    function generateApril2025() {
        // Efface le contenu actuel des dates
        datesCalendar.innerHTML = '';

        const daysInApril = 30;
        const firstDayOfMonth = 2; // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi (mardi ici)

        let currentRow = document.createElement('div');
        currentRow.classList.add('row-calendar');

        // Ajoute des cases vides avant le premier jour
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyCell = document.createElement('span');
            emptyCell.classList.add('empty');
            emptyCell.textContent = '-';
            currentRow.appendChild(emptyCell);
        }

        // Ajoute les jours du mois
        for (let day = 1; day <= daysInApril; day++) {
            const dayCell = document.createElement('span');
            dayCell.textContent = day;

            // !!!!!!! C'est cette partie qui est purement décorative pour avoir le rendu DISPO/UNDISPO tu peux supprimer et gérer tes jours ailleurs le style est configuré en CSS
            // Ajoute des classes conditionnelles pour les styles
            if (day % 7 === 0) {
                dayCell.classList.add('dispo');
            } else if (day % 5 === 0) {
                dayCell.classList.add('undispo');
            }
            // !!!!!!!!!!!!!!!! END CODE DECORATIF

            currentRow.appendChild(dayCell);

            // Passe à une nouvelle ligne après samedi (index 6)
            if ((firstDayOfMonth + day) % 7 === 0 && day !== daysInApril) {
                datesCalendar.appendChild(currentRow);
                currentRow = document.createElement('div');
                currentRow.classList.add('row-calendar');
            }
        }

        // Ajoute des cases vides à la fin pour compléter la dernière ligne
        const remainingCells = 7 - currentRow.children.length;
        if (remainingCells < 7) {
            for (let i = 0; i < remainingCells; i++) {
                const emptyCell = document.createElement('span');
                emptyCell.classList.add('empty');
                emptyCell.textContent = '-';
                currentRow.appendChild(emptyCell);
            }
        }

        datesCalendar.appendChild(currentRow); // Ajoute la dernière ligne
    }

    function generateMay2025() {
        // Efface le contenu actuel des dates
        datesCalendar.innerHTML = '';

        const daysInMay = 31;
        const firstDayOfMonth = 4; // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi (vendredi ici)

        let currentRow = document.createElement('div');
        currentRow.classList.add('row-calendar');

        // Ajoute des cases vides avant le premier jour
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyCell = document.createElement('span');
            emptyCell.classList.add('empty');
            emptyCell.textContent = '-';
            currentRow.appendChild(emptyCell);
        }

        // Ajoute les jours du mois
        for (let day = 1; day <= daysInMay; day++) {
            const dayCell = document.createElement('span');
            dayCell.textContent = day;

            currentRow.appendChild(dayCell);

            // Passe à une nouvelle ligne après samedi (index 6)
            if ((firstDayOfMonth + day) % 7 === 0 && day !== daysInMay) {
                datesCalendar.appendChild(currentRow);
                currentRow = document.createElement('div');
                currentRow.classList.add('row-calendar');
            }
        }

        // Ajoute des cases vides à la fin pour compléter la dernière ligne
        const remainingCells = 7 - currentRow.children.length;
        if (remainingCells < 7) {
            for (let i = 0; i < remainingCells; i++) {
                const emptyCell = document.createElement('span');
                emptyCell.classList.add('empty');
                emptyCell.textContent = '-';
                currentRow.appendChild(emptyCell);
            }
        }

        datesCalendar.appendChild(currentRow); // Ajoute la dernière ligne
    }

    function generateJune2025() {
        // Efface le contenu actuel des dates
        datesCalendar.innerHTML = '';

        const daysInJune = 30;
        const firstDayOfMonth = 0; // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi (dimanche ici)

        let currentRow = document.createElement('div');
        currentRow.classList.add('row-calendar');

        // Ajoute des cases vides avant le premier jour
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyCell = document.createElement('span');
            emptyCell.classList.add('empty');
            emptyCell.textContent = '-';
            currentRow.appendChild(emptyCell);
        }

        // Ajoute les jours du mois
        for (let day = 1; day <= daysInJune; day++) {
            const dayCell = document.createElement('span');
            dayCell.textContent = day;

            currentRow.appendChild(dayCell);

            // Passe à une nouvelle ligne après samedi (index 6)
            if ((firstDayOfMonth + day) % 7 === 0 && day !== daysInJune) {
                datesCalendar.appendChild(currentRow);
                currentRow = document.createElement('div');
                currentRow.classList.add('row-calendar');
            }
        }

        // Ajoute des cases vides à la fin pour compléter la dernière ligne
        const remainingCells = 7 - currentRow.children.length;
        if (remainingCells < 7) {
            for (let i = 0; i < remainingCells; i++) {
                const emptyCell = document.createElement('span');
                emptyCell.classList.add('empty');
                emptyCell.textContent = '-';
                currentRow.appendChild(emptyCell);
            }
        }

        datesCalendar.appendChild(currentRow); // Ajoute la dernière ligne
    }

    function updateCalendar() {
        if (currentMonth === 4) {
            currentMonthSpan.textContent = `Avril ${currentYear}`;
            generateApril2025(); // Génère avril
        } else if (currentMonth === 5) {
            currentMonthSpan.textContent = `Mai ${currentYear}`;
            generateMay2025(); // Génère mai
        } else if (currentMonth === 6) {
            currentMonthSpan.textContent = `Juin ${currentYear}`;
            generateJune2025(); // Génère juin
        }
    }

    // Initialiser avec avril
    updateCalendar();

    // Clic sur la flèche droite pour afficher le mois suivant (Mai ou Juin)
    document.getElementById('next-month').addEventListener('click', () => {
        if (currentMonth === 4) {
            currentMonth = 5; // Passage à Mai
        } else if (currentMonth === 5) {
            currentMonth = 6; // Passage à Juin
        }
        updateCalendar(); // Met à jour le calendrier
    });

    // Clic sur la flèche gauche pour revenir au mois précédent (Avril ou Mai)
    document.getElementById('prev-month').addEventListener('click', () => {
        if (currentMonth === 6) {
            currentMonth = 5; // Retour à Mai
        } else if (currentMonth === 5) {
            currentMonth = 4; // Retour à Avril
        }
        updateCalendar(); // Met à jour le calendrier
    });
});