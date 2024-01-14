//DOM-el & const
const placesList = document.querySelector(".places__list");
const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");
const editModal = document.querySelector(".popup_type_edit");
const addModal = document.querySelector(".popup_type_new-card");
const modal = document.querySelector(".popup");
const modalBtnClose = document.querySelectorAll(".popup__close");
const outputName = document.querySelector(".profile__title");
const outputJob = document.querySelector(".profile__description");
const formElement = document.forms[0];
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const formElementPlace = document.forms[1];
const placeNameInput = formElementPlace.querySelector(".popup__input_type_card-name");
const placeImgInput = formElementPlace.querySelector(".popup__input_type_url");
const popups = document.querySelectorAll(".popup");

//import func
import { initialCards } from "./cards.js";
import { addCard, delCard, like } from "./card.js";
import { openModal, closeModal, imgModalOpen, escPress, handleFormSubmit, handleCardFormSubmit } from "./modal.js";

//cards
initialCards.forEach(function (el) {
  placesList.append(
    addCard(el.name, el.link, el.name, delCard, imgModalOpen, like)
  );
});

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

//modals
editBtn.addEventListener("click", () => openModal(editModal));
addBtn.addEventListener("click", () => openModal(addModal));

modalBtnClose.forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    evt.stopPropagation();
    closeModal(evt.currentTarget.closest(".popup"));
  });
});

modal.addEventListener("click", (evt) => {
  const closeBtn = evt.target.closest(".popup__close");
  if (closeBtn) {
    closeModal(evt.currentTarget);
  }
});

document.addEventListener("keydown", escPress);

//forms
nameInput.value = outputName.textContent;
jobInput.value = outputJob.textContent;

formElement.addEventListener("submit", handleFormSubmit);

formElementPlace.addEventListener("submit", handleCardFormSubmit);

