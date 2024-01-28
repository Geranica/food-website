/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc () {
   //Calculator

   const result = document.querySelector ('.calculating__result span');
   
   let gender, height, weight, age, ratio;

   if (localStorage.getItem ('gender')) {
    gender = localStorage.getItem ('gender');
   } else {
    gender = 'female';
    localStorage.setItem ('gender', 'female');
   }

   if (localStorage.getItem ('ratio')) {
    ratio = +localStorage.getItem ('ratio');
   } else {
    ratio = 1.375;
    localStorage.setItem ('ratio', 1.375);
   }

   function initLocalSettings (selector, activeClass) {
    const elements = document.querySelectorAll (selector);
    elements.forEach (item => {
      item.classList.remove(activeClass);
      if (item.getAttribute ('id') === localStorage.getItem('gender')) {
        item.classList.add (activeClass);
      }
      if (item.getAttribute ('data-ratio') === localStorage.getItem('ratio')) {
        item.classList.add (activeClass);
      }
    });
   }

   initLocalSettings ('#gender div', 'calculating__choose-item_active');
   initLocalSettings ('.calculating__choose_big div', 'calculating__choose-item_active');
   

   function calcTotal () {
    if (!gender || !height || !weight || !age || !ratio) {
      result.textContent = '_____';
      return;
    }
    if (gender === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (5.7 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (4.3 * age)) * ratio);
    }
   }
   calcTotal ();

   function getStaticInformation (selector, activeClass) {
      const elements = document.querySelectorAll (selector);

      elements.forEach (item => {
        item.addEventListener ('click', (e) => {
          if (e.target.getAttribute ('data-ratio')) {
            ratio = +e.target.getAttribute ('data-ratio');
            localStorage.setItem ('ratio', +e.target.getAttribute ('data-ratio'));
          } else {
            gender = e.target.getAttribute ('id');
            localStorage.setItem ('gender', e.target.getAttribute ('id'));
          }
          elements.forEach (item => item.classList.remove (activeClass));
          e.target.classList.add (activeClass);
          calcTotal ();
        });
      });
   }

   getStaticInformation('#gender div', 'calculating__choose-item_active');
   getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

   function getDynamicInformation (selector) {
    const input = document.querySelector (selector);
    input.addEventListener('input', () => {
      if (input.value.match (/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }
      switch (input.getAttribute ('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      calcTotal ();
    });
    
   }

   getDynamicInformation ('#height');
   getDynamicInformation ('#weight');
   getDynamicInformation ('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_servises__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/servises */ "./js/services/servises.js");


function cards() {

  // classes for cards

  class MenuCard {
   constructor(src, alt, title, descr, price, parentSelector, ...classes) {
     this.src = src;
     this.alt = alt;
     this.title = title;
     this.descr = descr;
     this.price = price;
     this.transfer = 27;
     this.changeToUAH();
     this.parent = document.querySelector(parentSelector);
     this.classes = classes;
   }
   changeToUAH() {
     this.price = this.price * this.transfer;
   }
   render() {
     const element = document.createElement("div");

     if (this.classes.length === 0) {
       this.classes = ["menu__item"];
     }

     this.classes.forEach((item) => {
       element.classList.add(item);
     });

     element.innerHTML = `
         <img src=${this.src} alt=${this.alt}>
         <h3 class="menu__item-subtitle">${this.title}</h3>
         <div class="menu__item-descr">${this.descr}</div>
         <div class="menu__item-divider"></div>
         <div class="menu__item-price">
           <div class="menu__item-cost">Цена:</div>
           <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
         </div>`;

     this.parent.append(element);
   }
 }

 (0,_services_servises__WEBPACK_IMPORTED_MODULE_0__.getResource) ("http://localhost:3000/menu")
   .then (result => {
     result.forEach (({img, altimg, title, descr, price}) => {
       new MenuCard (img, altimg, title, descr, price, '.menu .container').render ();
     });
   });

   /* axios.get ("http://localhost:3000/menu")
     .then (data => {
       data.data.forEach (({img, altimg, title, descr, price}) => {
         new MenuCard (img, altimg, title, descr, price, '.menu .container').render ();
       });
     }); */

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_servises__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/servises */ "./js/services/servises.js");


// forms
function forms (modalSelector, bodySelector, formSelector) {
  const forms = document.querySelectorAll(formSelector);
  const modalWindow = document.querySelector(modalSelector);
  const body = document.querySelector(bodySelector);

  const message = {
    loading: "img/spinner.svg",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {

      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0px auto;
      `;
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify (Object.fromEntries(formData.entries ()));

      (0,_services_servises__WEBPACK_IMPORTED_MODULE_0__.postData) ("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    modalWindow.classList.add("show");
    body.classList.add("hidden");

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
      <div class="modal__content">
            <div data-close class="modal__close">x</div>
            <div class="modal__title">${message}</div>
      </div>
    `;
    document.querySelector(".modal").append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.remove("hide");
      modalWindow.classList.remove("show");
      body.classList.remove("hidden");
    }, 2500);
  }
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function modal (triggerSelector, modalSelector, bodySelector) {
   //Modal window

  const modalBtns = document.querySelectorAll(triggerSelector);
  const modalWindow = document.querySelector(modalSelector);
  const body = document.querySelector(bodySelector);

  function showAndHideModalWindow() {
    modalWindow.classList.toggle("show");
    body.classList.toggle("hidden");
    clearInterval(modalTimerId);
    window.removeEventListener("scroll", showModalByScroll);
  }

  modalBtns.forEach((item) => {
    item.addEventListener("click", () => {
      showAndHideModalWindow();
    });
  });

  modalWindow.addEventListener("click", (event) => {
    if (
      event.target === modalWindow ||
      event.target.hasAttribute("data-close")
    ) {
      showAndHideModalWindow();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modalWindow.classList.contains("show")) {
      showAndHideModalWindow();
    }
  });

  const modalTimerId = setTimeout(() => {
    // Делает активным модальное окно через указанное количество времени
    showAndHideModalWindow();
  }, 30000);

  function showModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      showAndHideModalWindow();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs () {
   
   //Tabs

  const tabs = document.querySelectorAll(".tabheader__item");
  const tabsContent = document.querySelectorAll(".tabcontent");
  const tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.matches(".tabheader__item")) {
      hideTabContent();
      showTabContent(Array.from(tabs).indexOf(target));
    }
  });
  hideTabContent();
  showTabContent();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {

   //Timer

  const deadline = "2024-02-15T18:00";

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((t / 1000 / 60) % 60);
      seconds = Math.floor((t / 1000) % 60);
    }

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector("#days");
    const hours = timer.querySelector("#hours");
    const minutes = timer.querySelector("#minutes");
    const seconds = timer.querySelector("#seconds");

    const timeInterval = setInterval(updateClock, 1000);

    updateClock(); // Чтобы при первом запуске страница обновила значение сразу, а не через секунду, как указано в timeInterval

    function updateClock() {
      const k = getTimeRemaining(endtime);
      const { total: t, days: d, hours: h, minutes: m, seconds: s } = k;

      days.innerHTML = d.toString().padStart(2, 0);
      hours.innerHTML = h.toString().padStart(2, 0);
      minutes.innerHTML = m.toString().padStart(2, 0);
      seconds.innerHTML = s.toString().padStart(2, 0);
      if (t <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/servises.js":
/*!*********************************!*\
  !*** ./js/services/servises.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
   const res = await fetch (url, {
     method: "POST",
     headers: {
       "Content-type": "multipart/form-data",
     },
     body: data,
   });

   return await res.json ();
 };

 const getResource = async (url) => {
   const res = await fetch (url);

   if (!res.ok) {
     throw new Error (`Could not fetch ${url}, status: ${res.status}`);
   }

   return await res.json ();
 };


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

  
  
  
  
  
  
  

document.addEventListener("DOMContentLoaded", () => {
  
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", ".modal", "body");
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])(".modal", "body", "form");
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])();

});

// запуск json-server: npx json-server db.json


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map