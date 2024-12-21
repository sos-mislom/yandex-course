const config = {
  ENDPOINT: 'https://nomoreparties.co/v1/apf-cohort-202',
  headers: {
    authorization: '66eab246-0801-4172-ab93-8eafbea8dab5',
    'Content-Type': 'application/json',
  },
};

// Функция для выполнения GET-запроса
function fetchData(url) {
  return fetch(url, {
    method: 'GET',
    headers: config.headers,
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
}

// Загрузка информации о пользователе
export function getUserInfo() {
  return fetch(`${config.ENDPOINT}/users/me`, {
    method: 'GET',
    headers: config.headers,
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  .catch(error => {
    console.error('Ошибка при загрузке информации о пользователе:', error);
  });
}

// Загрузка карточек
export function getCards() {
  return fetch(`${config.ENDPOINT}/cards`, {
    method: 'GET',
    headers: config.headers,
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    if (Array.isArray(data)) {
      return data;
    } else {
      return Promise.reject('Ответ не является массивом');
    }
  })
  .catch(error => {
    console.error('Ошибка при получении карточек:', error);
  });
}

// Функция для обновления данных пользователя
export function updateUserInfo(name, about) {
  const submitButton = document.querySelector('.popup__button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = "Сохранение...";

  return fetch(`${config.ENDPOINT}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then(updatedUser => {
      if (!updatedUser || !updatedUser.name || !updatedUser.about || !updatedUser.avatar) {
        return Promise.reject('Некорректный ответ от сервера');
      }
      return updatedUser;
    })
    .catch(error => {
      console.error('Ошибка при обновлении данных пользователя:', error);
      return Promise.reject(error);
    })
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
}

// Функция для добавления новой карточки
export function addCard(name, link) {
  const submitButton = document.querySelector('.popup__button-new-card');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = "Создание...";

  return fetch(`${config.ENDPOINT}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .catch(error => {
      console.error('Ошибка при добавлении новой карточки:', error);
    })
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
}

// Функция для удаления карточки
export function deleteCard(cardId) {
  const submitButton = document.querySelector('.popup__button_confirm');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = "Удаление...";

  return fetch(`${config.ENDPOINT}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  .catch(error => {
    console.error('Ошибка при добавлении новой карточки:', error);
  })
  .finally(() => {
    submitButton.textContent = originalButtonText;
  });
}

// Функция для постановки или снятия лайка с учетом цвета
export function handleLike(cardId, likeButton) {
  const method = likeButton.classList.contains('card__like-button_is-active') ? 'DELETE' : 'PUT';

  fetch(`${config.ENDPOINT}/cards/likes/${cardId}`, {
    method: method,
    headers: config.headers,
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then(updatedCard => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeButton.dataset.like = updatedCard.likes.length;
      const likeCountElement = likeButton.querySelector('.card__like-count');
      if (likeCountElement) {
        likeCountElement.textContent = updatedCard.likes.length;
      }
    })
    .catch(error => console.error('Ошибка при обновлении лайка:', error));
}

// Функция для обновления аватара на сервере
export function updateAvatar(avatarUrl) {
  const submitButton = document.querySelector('.popup__button-change-avatar');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = "Сохранение...";

  return fetch(`${config.ENDPOINT}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  .catch(error => {
    console.error('Ошибка при добавлении новой карточки:', error);
  })
  .finally(() => {
    submitButton.textContent = originalButtonText;
  });
}


