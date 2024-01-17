export const openModal = (modalEl) => {
  modalEl.classList.add("popup_is-opened");
  console.log("open");
  document.addEventListener("keydown", escPress);
};

export const closeModal = (modalEl) => {
  modalEl.classList.remove("popup_is-opened");
  console.log("close");
  document.removeEventListener("keydown", escPress);
};

export const escPress = (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    };
  }
};

export const closeOverlay = (evt) => {
  if (evt.target.classList.contains("popup_is-opened")) {
    closeModal(evt.target);
  }
};