import { postData } from "../services/servises";

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
}


export default forms;