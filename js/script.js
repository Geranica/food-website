"use strict";

document.addEventListener("DOMContentLoaded", () => {
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

  //Timer

  const deadline = "2024-01-15T18:00";

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

  //Modal window

  const modalBtns = document.querySelectorAll("[data-modal]");
  const modalWindow = document.querySelector(".modal");
  const body = document.querySelector("body");

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
  }, 50000);

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

  const getResource = async (url) => {
    const res = await fetch (url);

    if (!res.ok) {
      throw new Error (`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json ();
  };

  /* getResource ("http://localhost:3000/menu")
    .then (result => {
      result.forEach (({img, altimg, title, descr, price}) => {
        new MenuCard (img, altimg, title, descr, price, '.menu .container').render ();
      });
    }); */

    axios.get ("http://localhost:3000/menu")
      .then (data => {
        data.data.forEach (({img, altimg, title, descr, price}) => {
          new MenuCard (img, altimg, title, descr, price, '.menu .container').render ();
        });
      });


  // Forms

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "img/spinner.svg",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

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

      postData ("http://localhost:3000/requests", json)
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
  fetch("http://localhost:3000/menu")
    .then((data) => data.json())
    .then((res) => console.log(res));
});
