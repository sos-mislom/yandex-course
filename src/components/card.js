export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Селектор шаблона и списка карточек
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

export function createCard(cardData, openModal, modalImage, modalImageElement, modalCaptionElement) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  // Заполнение данными
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Логика лайка
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
  });

  // Логика удаления карточки
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  // Логика открытия модального окна
  cardImage.addEventListener('click', () => {
    modalImageElement.src = cardData.link;
    modalImageElement.alt = cardData.name;
    modalCaptionElement.textContent = cardData.name;
    openModal(modalImage);
  });

  return cardElement;
}

export function addCardsToLayout(cards, openModal, modalImage, modalImageElement, modalCaptionElement) {
  cards.forEach(cardData => {
    const card = createCard(cardData, openModal, modalImage, modalImageElement, modalCaptionElement);
    cardsContainer.append(card);
  });
}
