// в файле card.js описаны функции для работы с карточками: 
// функция создания карточки, 
// функции-обработчики событий удаления и лайка карточки;
// @todo: Функция создания карточки

const cardTemplate = document.querySelector("#card-template").content;
const card = document.querySelector(".places__item");

export function addCard(cardName, link, name, delCard, imgModalOpen, like) {
  const cardEl = cardTemplate.querySelector(".card").cloneNode(true);
  cardEl.querySelector(".card__title").textContent = cardName;
  const cardImage = cardEl.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;
  const delBtn = cardEl.querySelector(".card__delete-button");
  delBtn.addEventListener("click", delCard);
  cardImage.addEventListener("click", () => imgModalOpen(cardImage, cardName));
  const cardLikeBtn = cardEl.querySelector(".card__like-button");
  cardLikeBtn.addEventListener("click", () => like(cardLikeBtn));
  return cardEl;
}

export function delCard(event) {
  const listItem = event.target.closest(".card");
  listItem.remove();
}

export const like = (cardLikeBtn) => {
  cardLikeBtn.classList.toggle("card__like-button_is-active");
  console.log("like");
};