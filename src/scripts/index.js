const popups = document.querySelectorAll(".popup");
const placesList = document.querySelector(".places__list");
//modal's buttons
const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");
const editModal = document.querySelector(".popup_type_edit");
const modalBtnClose = document.querySelectorAll(".popup__close");
//outputs
const outputName = document.querySelector(".profile__title");
const outputJob = document.querySelector(".profile__description");
//popups, forms, inputs
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const formAddPlace = document.querySelector('form[name="new-place"]');
const placeNameInput = formAddPlace.querySelector(
  ".popup__input_type_card-name"
);
const placeImgInput = formAddPlace.querySelector(".popup__input_type_url");
//popup zooming img
const imgModal = document.querySelector(".popup_type_image");
const modalImgCaption = imgModal.querySelector(".popup__caption");
const modalImg = imgModal.querySelector(".popup__image");
//avatar POPUP
const formEditAvatar = document.querySelector('form[name="new-avatar"]');
const avatarInput = formEditAvatar.querySelector(
  ".popup__input_type_card-avatar"
);
const profileAvatar = document.querySelector(".profile__image");
const profilePopupAvatar = document.querySelector(".popup_type_avatar");
//MORE MODAL
const addModal = document.querySelector(".popup_type_new-card");

//modals import
import { openModal, closeModal, closeOverlay } from "./modal.js";
//validation IT'S JUST WORKS
import { enableValidation, clearValidation } from "../validation.js";
//new func-s
import { addCard, delCard, like } from "./card.js";
//for validation
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
//API API API
import {
  getCardsData,
  getUserData,
  postCardsData,
  patchUserData,
  avatarPatch,
} from "../api.js";

//better ux loading btn
const setLoadingBtn = (button, isLoading) => {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
};

//Overlay close listener
popups.forEach((modal) => modal.addEventListener("click", closeOverlay));

//promise all for cards
Promise.all([getUserData(), getCardsData()])
  .then(([userData, cardsData]) => {
    console.log("Данные пользователя:", userData);
    console.log("Данные карточек:", cardsData);

    if (userData) {
      outputName.textContent = userData.name;
      outputJob.textContent = userData.about;

      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

      cardsData.forEach((cardData) => {
        appendCard(cardData, userData);
      });
    }
  })
  .catch((error) => {
    console.log(`promise all ${error}`);
  });

const appendCard = (cardData, userData) => {
  const cardElement = addCard(
    cardData,
    userData,
    delCard,
    openImgModal,
    like
  );

  placesList.prepend(cardElement);
};

//MODALS
//edit profile MODAL
editBtn.addEventListener("click", () => {
  clearValidation(formEditProfile, config);
  nameInput.value = outputName.textContent;
  jobInput.value = outputJob.textContent;
  openModal(editModal);
});

const handleFormEditProfileSubmit = (evt) => {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const submitBtn = evt.target.querySelector(config.submitButtonSelector);
  setLoadingBtn(submitBtn, true);

  patchUserData(nameValue, jobValue)
    .then((updateUserData) => {
      outputName.textContent = updateUserData.name;
      outputJob.textContent = updateUserData.about;
      closeModal(editModal);
    })
    .catch((error) => {
      console.error(
        `update profile(handleFormEditProfileSubmit/patchUserData): ${error}`
      );
    })
    .finally(() => {
      setLoadingBtn(submitBtn, false);
    });
};

formEditProfile.addEventListener("submit", handleFormEditProfileSubmit);

//add card MODAL
addBtn.addEventListener("click", () => {
  openModal(addModal);
  clearValidation(formAddPlace, config);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardNameValue = placeNameInput.value;
  const cardImgValue = placeImgInput.value;

  const submitBtn = evt.target.querySelector(config.submitButtonSelector);
  setLoadingBtn(submitBtn, true);

  postCardsData(cardNameValue, cardImgValue)
    .then((data) => {
      appendCard(data, data.owner);
      closeModal(addModal);
      clearValidation(formAddPlace, config);
    })
    .catch((error) => {
      console.error(`error in postcardsdata in handlecardformsubmit: ${error}`);
    })
    .finally(() => {
      setLoadingBtn(submitBtn, false);
    });
}

formAddPlace.addEventListener("submit", handleCardFormSubmit);

//open img MODAL
const openImgModal = (link, name) => {
  if (link && name) {
    openModal(imgModal);
    modalImg.src = link;
    modalImg.alt = name;
    modalImgCaption.textContent = name;
  } else {
    console.error("err in imgmodal");
  }
};

//open avatar modal
profileAvatar.addEventListener("click", () => {
  openModal(profilePopupAvatar);
  formEditAvatar.reset();
  clearValidation(formEditAvatar, config);
});

//update new avatar
formEditAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const newAvatarUrl = avatarInput.value;

  const submitBtn = evt.target.querySelector(config.submitButtonSelector);
  setLoadingBtn(submitBtn, true);

  avatarPatch(newAvatarUrl)
    .then((data) => {
      profileAvatar.style.backgroundImage = `url(${newAvatarUrl})`;
      closeModal(profilePopupAvatar);
    })
    .catch((error) => {
      console.log("error in avatar update", error);
    })
    .finally(() => {
      setLoadingBtn(submitBtn, false);
    });
});

//close MODAL
modalBtnClose.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", (evt) => {
    closeModal(popup);
  });
});

//better ux
popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

enableValidation(config);
