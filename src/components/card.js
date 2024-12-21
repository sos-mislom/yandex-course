import { closeModal } from './modal.js';
import { deleteCard, handleLike } from './api.js';

// Селектор шаблона и списка карточек
const template = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

export function createCard(data, openModal, imagePopup, imageElement, captionElement, currentUserId, confirmPopup) {
  const cardElement = template.querySelector('.card').cloneNode(true);

  // Заполнение данными
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardImage.src = data.link;
  cardImage.alt = data.name;

  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = data.name;

  // Инициализация лайков
  const likes = Array.isArray(data.likes) ? data.likes : [];
  likeButton.dataset.like = likes.length;

  // Логика лайка
  const userLiked = data.likes.some(like => like._id === currentUserId);
  if (userLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }
  likeButton.addEventListener('click', () => {
    handleLike(data._id, likeButton);
  });

  // Логика антихайпа
  if (data.owner._id !== currentUserId) {
    deleteButton.style.display = 'none';
  }

  cardImage.addEventListener('click', () => {
    imageElement.src = cardImage.src;
    captionElement.textContent = cardTitle.textContent;
    openModal(imagePopup);
  });

 // Логика открытия модального окна
  deleteButton.addEventListener('click', () => {
    openModal(confirmPopup);

    confirmPopup.querySelector('.popup__button').addEventListener('click', (evt) => {
      evt.preventDefault();

      deleteCard(data._id)
        .then(() => {
          cardElement.remove();
          closeModal(confirmPopup);
        })
        .catch((err) => {
          console.error('Ошибка при удалении карточки:', err);
          closeModal(confirmPopup);
        });
    });
  });

  return cardElement;
}

export function addCardsToLayout(cards, openModal, imagePopup, imageElement, captionElement, currentUserId, confirmPopup) {
  if (Array.isArray(cards)) {
    cards.forEach(cardData => {
      const card = createCard(cardData, openModal, imagePopup, imageElement, captionElement, currentUserId, confirmPopup);
      placesList.append(card);
    });
  }
}
