//DOM-el & const
const popups = document.querySelectorAll(".popup");
const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");
const editModal = document.querySelector(".popup_type_edit");
const modalBtnClose = document.querySelectorAll(".popup__close");
const outputName = document.querySelector(".profile__title");
const outputJob = document.querySelector(".profile__description");
const formElement = document.querySelector('form[name="edit-profile"]');
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const formElementPlace = document.querySelector('form[name="new-place"]');
const placeNameInput = formElementPlace.querySelector(".popup__input_type_card-name");
const placeImgInput = formElementPlace.querySelector(".popup__input_type_url");
const imgModal = document.querySelector(".popup_type_image");
const modalImgCaption = imgModal.querySelector(".popup__caption");
const modalImg = imgModal.querySelector(".popup__image");
const placesList = document.querySelector(".places__list");
const addModal = document.querySelector(".popup_type_new-card");

import { initialCards } from "./cards.js";
import { addCard, delCard, like } from "./card.js";
import {
  openModal,
  closeModal,
  closeOverlay,
} from "./modal.js";

popups.forEach(modal => modal.addEventListener('click', closeOverlay));

const imgModalOpen = (link, name) => {
  openModal(imgModal);
  modalImg.src = link;
  modalImg.alt = name;
  modalImgCaption.textContent = name;
};

initialCards.forEach(function (el) {
  placesList.append(addCard(el.name, el.link, delCard, imgModalOpen, like));
});

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

modalBtnClose.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", (evt) => {
    closeModal(popup);
  });
});

editBtn.addEventListener("click", () => {
  nameInput.value = outputName.textContent;
  jobInput.value = outputJob.textContent;
  openModal(editModal);
});

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  outputName.textContent = nameValue;
  outputJob.textContent = jobValue;
  closeModal(editModal);
};

formElement.addEventListener("submit", handleFormSubmit);

addBtn.addEventListener("click", () => openModal(addModal));

function handleCardFormSubmit(evt, placeNameInput, placeImgInput) {
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

formElementPlace.addEventListener("submit", (evt) => {
  handleCardFormSubmit(evt, placeNameInput, placeImgInput);
});