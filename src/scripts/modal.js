// в файле modal.js описаны функции для работы с модальными окнами: 
// функция открытия модального окна, 
// функция закрытия модального окна, 
// функция-обработчик события нажатия Esc и 
// функция-обработчик события клика по оверлею;
const imgModal = document.querySelector(".popup_type_image");
const modalImgCaption = imgModal.querySelector(".popup__caption");
const modalImg = imgModal.querySelector(".popup__image");

export const openModal = (modalEl) => {
  modalEl.classList.add("popup_is-opened");
  console.log("open");
  document.addEventListener("click", closeOverlay);
};

export const closeModal = (modalEl) => {
  modalEl.classList.remove("popup_is-opened");
  console.log("close");
  document.removeEventListener("click", closeOverlay);
};

export const imgModalOpen = (cardImage, cardName) => {
  openModal(imgModal);
  modalImg.src = cardImage.src;
  modalImg.alt = cardImage.alt;
  modalImgCaption.textContent = cardName;
};

export const escPress = (evt) => {
  if (evt.key === "Escape") {
    const modals = document.querySelectorAll(".popup_is-opened");
    modals.forEach((modal) => {
      closeModal(modal);
    });
  }
};

export const closeOverlay = (evt) => {
  if (evt.target.classList.contains("popup_is-opened")) {
    closeModal(evt.target);
  }
};

export const handleFormSubmit = (evt) => {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  outputName.textContent = nameValue;
  outputJob.textContent = jobValue;

  closeModal(editModal);
};

export function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardNameValue = placeNameInput.value;
  const cardImgValue = placeImgInput.value;
  const newCard = addCard(
    cardNameValue,
    cardImgValue,
    cardNameValue,
    delCard,
    imgModalOpen,
    like
  );
  placesList.prepend(newCard);
  closeModal(addModal);
  formElementPlace.reset();
}