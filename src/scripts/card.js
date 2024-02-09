import { deleteCard, likeDel, likePut } from "../api";

const cardTemplate = document.querySelector("#card-template").content;

// addcard func
export const addCard = (
  cardData,
  userData,
  delCard,
  openImgModal,
  like
) => {
  const cardEl = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardEl.querySelector(".card__title");
  const cardImage = cardEl.querySelector(".card__image");
  const delBtn = cardEl.querySelector(".card__delete-button");
  const cardLikeBtn = cardEl.querySelector(".card__like-button");
  const cardLikeCount = cardEl.querySelector(".card__like-count");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  if (userData && cardData.likes) {
    const isUserLiked = cardData.likes.some(
      (like) => like._id === userData._id
    );
    if (isUserLiked) {
      cardLikeBtn.classList.add("card__like-button_is-active");
    }
  }

  if (cardData.owner._id === userData._id) {
    delBtn.addEventListener("click", () => {
      delCard(cardData._id, cardEl);
    });
  } else {
    delBtn.style.display = "none";
  }

  cardImage.addEventListener("click", () =>
    openImgModal(cardData.link, cardData.name)
  );
  cardLikeBtn.addEventListener("click", () =>
    like(cardData, cardLikeBtn, cardLikeCount)
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
    })
    .catch((error) => {
      console.log(`error in deleteCard in delCard: ${error}`);
    });
};

// like func
export const like = (cardData, cardLikeBtn, cardLikeCount) => {
  const isLiked = cardLikeBtn.classList.contains("card__like-button_is-active");
  const cardId = cardData._id;

  const likeMethod = isLiked ? likeDel : likePut;

  likeMethod(cardId)
    .then((updatedCard) => {
      cardLikeBtn.classList.toggle("card__like-button_is-active");
      cardLikeCount.textContent = updatedCard.likes.length;
    })
    .catch((error) => {
      console.log(`error in likeDel in like: ${error}`);
    });
};
