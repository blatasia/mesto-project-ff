// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const card = document.querySelector(".places__item");

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function addCard(name, link, name, delCard) {
  const cardEl = cardTemplate.querySelector(".card").cloneNode(true);
  cardEl.querySelector(".card__title").textContent = name;
  cardEl.querySelector(".card__image").src = link;
  cardEl.querySelector(".card__image").alt = name
  const delBtn = cardEl.querySelector(".card__delete-button");
  delBtn.addEventListener("click", delCard);
  return cardEl;
}

// @todo: Функция удаления карточки
function delCard(event) {
  const listItem = event.target.closest(".card");
  listItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (el) {
  placesList.append(addCard(el.name, el.link, el.name, delCard));
});
