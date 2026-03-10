   function showTab(index) {
            // Убираем активный класс у всех кнопок
            document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
            // Убираем активный класс у всего контента
            document.querySelectorAll('.pane').forEach(pane => pane.classList.remove('active'));
            
            // Активируем нужную кнопку и контент
            document.querySelectorAll('.tab')[index].classList.add('active');
            document.querySelectorAll('.pane')[index].classList.add('active');
        }
       
        const track = document.getElementById('sliderTrack');
        const slides = document.querySelectorAll('.slide');
        const prevArrow = document.getElementById('prevArrow');
        const nextArrow = document.getElementById('nextArrow');
        const dotsContainer = document.getElementById('dotsContainer');
        const slideInfo = document.getElementById('slideInfo');
        const tabs = document.querySelectorAll('.tab-btn');
        
        let currentIndex = 0;
        const totalSlides = 3; // Фиксированно 3 слайда

        // Создаем 3 точки
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }

        const dots = document.querySelectorAll('.dot');
        updateActiveElements();

        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
        }

        function moveSlide(direction) {
            currentIndex += direction;
            
            // Зацикливание для 3 слайдов
            if (currentIndex < 0) currentIndex = totalSlides - 1; // 2
            if (currentIndex >= totalSlides) currentIndex = 0;
            
            updateSlider();
        }

        function updateSlider() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateActiveElements();
            updateSlideInfo();
        }

        function updateActiveElements() {
            // Обновляем табы
            tabs.forEach((tab, index) => {
                if (index === currentIndex) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });
            
            // Обновляем точки
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function updateSlideInfo() {
            slideInfo.textContent = `Слайд ${currentIndex + 1} из ${totalSlides}`;
        }

        // Стрелки
        prevArrow.addEventListener('click', () => moveSlide(-1));
        nextArrow.addEventListener('click', () => moveSlide(1));

        // Клавиатура
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                moveSlide(-1);
            } else if (e.key === 'ArrowRight') {
                moveSlide(1);
            }
        });

        // Свайпы
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeThreshold = 50;
            const difference = touchStartX - touchEndX;
            
            if (Math.abs(difference) > swipeThreshold) {
                if (difference > 0) {
                    moveSlide(1);
                } else {
                    moveSlide(-1);
                }
            }
        });