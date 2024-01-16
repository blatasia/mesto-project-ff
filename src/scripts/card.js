const cardTemplate = document.querySelector("#card-template").content;

import { imgModalOpen as openImgModal} from "./index.js";

export function addCard(name, link, delCard, imgModalOpen, like) {
  const cardEl = cardTemplate.querySelector(".card").cloneNode(true);
  cardEl.querySelector(".card__title").textContent = name;
  const cardImage = cardEl.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;
  const delBtn = cardEl.querySelector(".card__delete-button");
  delBtn.addEventListener("click", delCard);
  cardImage.addEventListener("click", () => openImgModal(link, name)); //
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
};