export const placesList = document.querySelector(".places__list");
export const addModal = document.querySelector(".popup_type_new-card");
export const formElementPlace = document.forms[1];
export const formElement = document.forms[0];
export const nameInput = formElement.querySelector(".popup__input_type_name");
export const jobInput = formElement.querySelector(".popup__input_type_description");
export const popups = document.querySelectorAll(".popup");
export const imgModal = document.querySelector(".popup_type_image");
export const modalImgCaption = imgModal.querySelector(".popup__caption");
export const modalImg = imgModal.querySelector(".popup__image");
const outputName = document.querySelector(".profile__title");
const outputJob = document.querySelector(".profile__description");

import { addCard, delCard, like } from "./card";
import { imgModalOpen } from "./index.js";

export const openModal = (modalEl) => {
  modalEl.classList.add("popup_is-opened");
  console.log("open");
  popups.forEach(modal => modal.addEventListener('click', closeOverlay));
  document.addEventListener("keydown", escPress);
  nameInput.value = outputName.textContent;
  jobInput.value = outputJob.textContent;
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

export function handleCardFormSubmit(evt, placeNameInput, placeImgInput) {
  evt.preventDefault();
  const cardNameValue = placeNameInput.value;
  const cardImgValue = placeImgInput.value;
  const newCard = addCard(
    cardNameValue,
    cardImgValue,
    delCard,
    imgModalOpen,
    like
  );
  placesList.prepend(newCard);
  closeModal(addModal);
  formElementPlace.reset();
}