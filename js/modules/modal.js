
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

export default modal;
