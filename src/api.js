//serv config, token,
const fetchConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-5",
  headers: {
    authorization: "73ddb3d3-1354-4280-bd5d-e2e1e3aba172",
    "Content-Type": "application/json",
  },
};

//ERROR CHECK
const resCheck = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка: ${res.status}`));
};

//getting cards from serv
export const getCardsData = () => {
  return fetch(`${fetchConfig.baseUrl}/cards`, {
    method: "GET",
    headers: {
      authorization: fetchConfig.headers.authorization,
    },
  }).then(resCheck);
};

//add card to serv
export const postCardsData = (cardName, cardLink) => {
  const cardData = {
    name: cardName,
    link: cardLink,
  };

  return fetch(`${fetchConfig.baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: fetchConfig.headers.authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardData),
  }).then(resCheck);
};

//getting users from serv
export const getUserData = () => {
  return fetch(`${fetchConfig.baseUrl}/users/me`, {
    method: "GET",
    headers: {
      authorization: fetchConfig.headers.authorization,
    },
  }).then(resCheck);
};

//user data,go to form jail
export const patchUserData = (userName, userAbout) => {
  const userData = {
    name: userName,
    about: userAbout,
  };

  return fetch(`${fetchConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: fetchConfig.headers.authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then(resCheck);
};

//like card
export const likePut = (cardId) => {
  return fetch(`${fetchConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: fetchConfig.headers.authorization,
    },
  }).then(resCheck);
};

//del card
export const deleteCard = (cardId) => {
  return fetch(`${fetchConfig.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: fetchConfig.headers.authorization,
    },
  })
    .then((res) => resCheck(res))
    .then(() => console.log("deleteCard activated"));
};

//del like from card
export const likeDel = (cardId) => {
  return fetch(`${fetchConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: fetchConfig.headers.authorization,
    },
  }).then(resCheck);
};

// avatar edit func
export const avatarPatch = (avatarUrl) => {
  return fetch(`${fetchConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: fetchConfig.headers.authorization,
      "Content-Type": fetchConfig.headers["Content-Type"],
    },
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then(resCheck);
};
