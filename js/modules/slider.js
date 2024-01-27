function slider () {
   // Slider (variant 1)

  /* const slides = document.querySelectorAll ('.offer__slide');
  const prevSlideBtn = document.querySelector ('.offer__slider-prev');
  const nextSlideBtn = document.querySelector ('.offer__slider-next');
  const currentSlide = document.querySelector ('#current');
  const totalSlides = document.querySelector ('#total');
  let indexOfSlide = 1;

  function showSlide () {

    slides.forEach (item => {
      item.classList.add ('hide');
      item.classList.remove ('show');
    });

    totalSlides.innerHTML = `${slides.length.toString().padStart (2, 0)}`;
    currentSlide.innerHTML = `${indexOfSlide.toString().padStart(2, 0)}`;

    slides [indexOfSlide - 1].classList.add ('show');
    slides [indexOfSlide - 1].classList.remove ('hide');

  }
  showSlide ();

  nextSlideBtn.addEventListener ('click', () => {
    if (indexOfSlide >= slides.length) {
      indexOfSlide = 1;
      showSlide ();
    } else {
      indexOfSlide++;
      showSlide ();
    }
  });

  prevSlideBtn.addEventListener ('click', () => {
    if (indexOfSlide <= 1) {
      indexOfSlide = slides.length;
      showSlide ();
    } else {
      indexOfSlide--;
      showSlide ();
    }
  }); */


  // Slider (variant 2)

  const slides = document.querySelectorAll ('.offer__slide');
  const slider = document.querySelector ('.offer__slider');//оболочка всего слайдера
  const prevSlideBtn = document.querySelector ('.offer__slider-prev');
  const nextSlideBtn = document.querySelector ('.offer__slider-next');
  const currentSlide = document.querySelector ('#current');
  const totalSlides = document.querySelector ('#total');
  const slidesWrapper = document.querySelector('.offer__slider-wrapper');//окно для просмотра слайдов
  const slidesField = document.querySelector ('.offer__slider-inner');// оболочка со всеми слайдами
  const width = window.getComputedStyle (slidesWrapper).width; //ширина окна для просмотра слайдов. Формат: строка, значение + px
  
  //ориентир для счетчика показа слайдов
  let indexOfSlide = 1;

  totalSlides.textContent = `${slides.length.toString().padStart(2, 0)}`;
  currentSlide.textContent = `${indexOfSlide.toString().padStart(2, 0)}`;

  //ориентир для показа текущего слайда
  let offset = 0;

  // 100 % умножаем на количество слайдов и записываем это значение как ширину иннера. Таким образом он займет 400% ширины своего родителя (slidesWrapper)
  slidesField.style.width = 100 * slides.length + '%'; 

  // все слайды выстроить в строку
  slidesField.style.display = 'flex';

  // добавить плавности
  slidesField.style.transition = '0.5s all';

  //скрываем все слайды кроме одного
  slidesWrapper.style.overflow = 'hidden';

  // делаем все слайды одинаковой ширины
  slides.forEach (slide => {
    slide.style.width = width;
  });

  slider.style.position = 'relative';

  //создаем панель навигации
  const indicators = document.createElement ('ol');
  const dots = [];
  
  //добавляем стили для панели навигации
  indicators.classList.add ('carousel-indicators');

  slider.append (indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement ('li');
    dot.setAttribute ('data-slide-to', i + 1);
    dot.classList.add ('dot');
    if (i === 0) {
      dot.classList.add ('dot_active');
    }
    indicators.append (dot);
    dots.push (dot);
  }

  nextSlideBtn.addEventListener ('click', () => {
    // делаем проверку, последний ли слайд
    if (offset === parseFloat (width) * (slides.length - 1)) {
      offset = 0;
    // Если не последний, то в offset добавляется ширина еще одного слайда
    } else {
      offset += parseFloat (width);
    }

    // смещает оболочку со слайдами влево на величину offset
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (indexOfSlide === slides.length) {
      indexOfSlide = 1;
    } else {
      indexOfSlide++;
    }

    currentSlide.textContent = `${indexOfSlide.toString().padStart(2, 0)}`;

    dots.forEach ((item) => {
      item.classList.add ('dot_inactive');
      item.classList.remove ('dot_active');
    });

    dots[indexOfSlide - 1].classList.remove ('dot_inactive');
    dots[indexOfSlide - 1].classList.add ('dot_active');
  });

  prevSlideBtn.addEventListener ('click', () => {

    // делаем проверку, первый ли у нас слайд
    if (offset === 0) {
      // записываем в переменную offset последний слайд
      offset = parseFloat (width) * (slides.length - 1);
    // Если не последний, то в offset добавляется ширина еще одного слайда
    } else {
      offset -= parseFloat (width);
    }

    // смещает оболочку со слайдами влево на величину offset
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (indexOfSlide === 1) {
      indexOfSlide = slides.length;
    } else {
      indexOfSlide--;
    }

    currentSlide.textContent = `${indexOfSlide.toString().padStart(2, 0)}`;

    dots.forEach ((item) => {
      item.classList.add ('dot_inactive');
      item.classList.remove ('dot_active');
    });

    dots[indexOfSlide - 1].classList.remove ('dot_inactive');
    dots[indexOfSlide - 1].classList.add ('dot_active');
  });

   dots.forEach (item => {
    item.addEventListener ('click', (e) => {

      const slideTo = e.target.getAttribute('data-slide-to');
      indexOfSlide = slideTo;
      offset = parseFloat (width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;

      currentSlide.textContent = `${indexOfSlide.toString().padStart(2, 0)}`;

      dots.forEach ((item) => {
        item.classList.add ('dot_inactive');
        item.classList.remove ('dot_active');
      });
  
      dots[indexOfSlide - 1].classList.remove ('dot_inactive');
      dots[indexOfSlide - 1].classList.add ('dot_active');
    });
   });
}

module.exports = slider;