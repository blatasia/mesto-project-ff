import { deleteCard, likeDel, likePut } from "../api";

const cardTemplate = document.querySelector("#card-template").content;

// addcard func
export const addCard = (
  id,
  cardData,
  userData,
  delCard,
  imgModalOpen,
  like
) => {
  console.log("userData:", userData);
  console.log("cardData:", cardData);

  const cardEl = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardEl.querySelector(".card__title");
  const cardImage = cardEl.querySelector(".card__image");
  const delBtn = cardEl.querySelector(".card__delete-button");
  const cardLikeBtn = cardEl.querySelector(".card__like-button");
  const cardLikeCount = cardEl.querySelector(".card__like-count");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardEl.dataset.id = id;

  if (userData && cardData.likes) {
    const isUserLiked = cardData.likes.some(
      (like) => like._id === userData._id
    );
    if (isUserLiked) {
      cardLikeBtn.classList.add("card__like-button_is-active");
    }
  }

  if (cardData.owner._id === userData._id) {
    console.log("user is the owner. welcome delete button.");
    console.log("event listener to delete button.");
    delBtn.addEventListener("click", () => {
      console.log("DEL BTN CLICKED");
      delCard(cardData._id, cardEl);
    });
  } else {
    console.log("user is imposter. hiding delete button.");
    delBtn.style.display = "none";
  }

  cardImage.addEventListener("click", () =>
    imgModalOpen(cardData.link, cardData.name)
  );
  cardLikeBtn.addEventListener("click", () =>
    like(cardEl, cardData, userData, cardLikeBtn, cardLikeCount)
  );

  if (cardData.likes && cardData.likes.length) {
    cardLikeCount.textContent = cardData.likes.length;
  } else {
    cardLikeCount.textContent = 0;
  }

  return cardEl;
};

// delcard func
export const delCard = (cardId, cardEl) => {
  deleteCard(cardId)
    .then(() => {
      cardEl.remove();
      console.log("card deleted");
    })
    .catch((error) => {
      console.log(`error in deleteCard in delCard: ${error}`);
    });
};

// like func
export const like = (
  cardEl,
  cardData,
  userData,
  cardLikeBtn,
  cardLikeCount
) => {
  const isLiked = cardLikeBtn.classList.contains("card__like-button_is-active");
  const cardId = cardData._id;

  if (isLiked) {
    likeDel(cardId)
      .then((updatedCard) => {
        cardLikeBtn.classList.toggle("card__like-button_is-active");
        cardLikeCount.textContent = updatedCard.likes.length;
      })
      .catch((error) => {
        console.log(`error in likeDel in like: ${error}`);
      });
  } else {
    likePut(cardId)
      .then((updatedCard) => {
        cardLikeBtn.classList.toggle("card__like-button_is-active");
        cardLikeCount.textContent = updatedCard.likes.length;
      })
      .catch((error) => {
        console.log(`error in likePut in like: ${error}`);
      });
  }
};
