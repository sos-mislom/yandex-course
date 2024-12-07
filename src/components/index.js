import '../pages/index.css';
import { createCard, addCardsToLayout, initialCards } from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation } from './validate.js';

// Настройки валидации
const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Активация валидации
enableValidation(formValidationConfig);

// DOM элементы
const popupEditProfile = document.querySelector('.popup_type_edit');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const inputName = popupEditProfile.querySelector('.popup__input_type_name');
const inputJob = popupEditProfile.querySelector('.popup__input_type_description');
const profileNameElement = document.querySelector('.profile__title');
const profileJobElement = document.querySelector('.profile__description');
const buttonEditProfile = document.querySelector('.profile__edit-button');

const popupAddCard = document.querySelector('.popup_type_new-card');
const formAddCard = popupAddCard.querySelector('.popup__form');
const inputCardName = popupAddCard.querySelector('.popup__input_type_card-name');
const inputCardLink = popupAddCard.querySelector('.popup__input_type_url');
const buttonAddCard = document.querySelector('.profile__add-button');

const popupImagePreview = document.querySelector('.popup_type_image');
const imagePreview = popupImagePreview.querySelector('.popup__image');
const captionPreview = popupImagePreview.querySelector('.popup__caption');

// Отображение начальных карточек
addCardsToLayout(initialCards, openModal, popupImagePreview, imagePreview, captionPreview);

// Анимация для попапов при загрузке
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.popup').forEach(popup => {
    popup.classList.add('popup_is-animated');
  });
});

// События редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  inputName.value = profileNameElement.textContent;
  inputJob.value = profileJobElement.textContent;
  openModal(popupEditProfile);
});

formEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileNameElement.textContent = inputName.value;
  profileJobElement.textContent = inputJob.value;
  closeModal(popupEditProfile);
});

// События добавления новой карточки
buttonAddCard.addEventListener('click', () => {
  inputCardName.value = '';
  inputCardLink.value = '';
  openModal(popupAddCard);
});

formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const newCardData = {
    name: inputCardName.value,
    link: inputCardLink.value,
  };

  const newCard = createCard(newCardData, openModal, popupImagePreview, imagePreview, captionPreview);
  document.querySelector('.places__list').prepend(newCard);
  closeModal(popupAddCard);
});
