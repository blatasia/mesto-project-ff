//DOM-el & const
const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");
const editModal = document.querySelector(".popup_type_edit");
const modal = document.querySelector(".popup");
const modalBtnClose = document.querySelectorAll(".popup__close");
const placeNameInput = formElementPlace.querySelector(
  ".popup__input_type_card-name"
);
const placeImgInput = formElementPlace.querySelector(".popup__input_type_url");
const outputName = document.querySelector(".profile__title");
const outputJob = document.querySelector(".profile__description");

//import
import { initialCards } from "./cards.js";
import { addCard, delCard, like } from "./card.js";
import {
  popups,
  modalImg,
  imgModal,
  modalImgCaption,
  formElementPlace,
  placesList,
  addModal,
  openModal,
  closeModal,
  handleCardFormSubmit,
  formElement,
  nameInput,
  jobInput,
} from "./modal.js";

//cards
initialCards.forEach(function (el) {
  placesList.append(addCard(el.name, el.link, delCard, imgModalOpen, like));
});

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

//modals
editBtn.addEventListener("click", () =>
  openModal(editModal, outputName.textContent, outputJob.textContent)
);
addBtn.addEventListener("click", () => openModal(addModal));

modalBtnClose.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", (evt) => {
    closeModal(popup);
  });
});

export const imgModalOpen = (link, name) => {
  openModal(imgModal);
  modalImg.src = link;
  modalImg.alt = name;
  modalImgCaption.textContent = name;
};

//forms
formElementPlace.addEventListener("submit", (evt) => {
  handleCardFormSubmit(evt, placeNameInput, placeImgInput);
});

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  console.log("submit");
  outputName.textContent = nameValue;
  outputJob.textContent = jobValue;
  closeModal(editModal);
};

formElement.addEventListener("submit", handleFormSubmit);