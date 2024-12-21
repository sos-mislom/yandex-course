import '../pages/index.css';
import { createCard, addCardsToLayout } from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation } from './validate.js';
import { getUserInfo, getCards, updateUserInfo, addCard, updateAvatar } from './api.js';

// DOM
const selectors = {
  profilePopup: '.popup_type_edit',
  profileForm: '.popup__form',
  profileAvatar: '.profile__image',
  nameInput: '.popup__input_type_name',
  jobInput: '.popup__input_type_description',
  profileTitle: '.profile__title',
  profileDescription: '.profile__description',
  editButton: '.profile__edit-button',
  cardPopup: '.popup_type_new-card',
  cardForm: '.popup__form',
  placeNameInput: '.popup__input_type_card-name',
  linkInput: '.popup__input_type_url',
  imagePopup: '.popup_type_image',
  imageElement: '.popup__image',
  captionElement: '.popup__caption',
  addButton: '.profile__add-button',
  confirmPopup: '.popup_confirm',
  placesList: '.places__list',
  popupChangeAvatar: '.popup_change-avatar',
  avatarForm: '.popup__form-change',
  avatarInput: '.popup__input_avatar',
};

const elements = Object.fromEntries(
  Object.entries(selectors).map(([key, selector]) => [key, document.querySelector(selector)])
);

// Настрйоки валидации
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

// Функции
function initializeUserProfile() {
  getUserInfo()
    .then(user => {
      updateProfileInfo(user);
      const currentUserId = user._id;

      return getCards().then(cards => {
        if (Array.isArray(cards)) {
          addCardsToLayout(
            cards,
            openModal,
            elements.imagePopup,
            elements.imageElement,
            elements.captionElement,
            currentUserId,
            elements.confirmPopup
          );
        } else {
          throw new Error('Invalid data format: cards is not an array');
        }
      });
    })
    .catch(error => console.error('Initialization error:', error));
}

function updateProfileInfo(user) {
  elements.profileTitle.textContent = user.name;
  elements.profileDescription.textContent = user.about;
  elements.profileAvatar.style.backgroundImage = `url(${user.avatar})`;
  elements.profileAvatar.alt = `Аватар пользователя ${user.name}`;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = elements.nameInput.value;
  const about = elements.jobInput.value;

  updateUserInfo(name, about)
    .then(user => {
      updateProfileInfo(user);
      closeModal(elements.profilePopup);
    })
    .catch(error => console.error('Profile update error:', error));
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = elements.placeNameInput.value;
  const link = elements.linkInput.value;

  addCard(name, link)
    .then(newCard => {
      const card = createCard(
        newCard,
        openModal,
        elements.imagePopup,
        elements.imageElement,
        elements.captionElement,
        newCard.owner._id,
        elements.confirmPopup
      );
      elements.placesList.prepend(card);
      closeModal(elements.cardPopup);
      resetForm(elements.cardForm);
    })
    .catch(error => console.error('Card addition error:', error));
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatarUrl = elements.avatarInput.value;

  updateAvatar(avatarUrl)
    .then(updatedUser => {
      elements.profileAvatar.style.backgroundImage = `url(${updatedUser.avatar})`;
      closeModal(elements.popupChangeAvatar);
      resetForm(elements.avatarForm);
    })
    .catch(error => console.error('Avatar update error:', error));
}

function resetForm(form) {
  form.reset();
}

function initializeEventListeners() {
  elements.editButton.addEventListener('click', () => {
    elements.nameInput.value = elements.profileTitle.textContent;
    elements.jobInput.value = elements.profileDescription.textContent;
    openModal(elements.profilePopup);
  });

  elements.profileForm.addEventListener('submit', handleProfileFormSubmit);

  elements.addButton.addEventListener('click', () => {
    resetForm(elements.cardForm);
    openModal(elements.cardPopup);
  });

  elements.cardForm.addEventListener('submit', handleCardFormSubmit);

  elements.profileAvatar.addEventListener('click', () => {
    openModal(elements.popupChangeAvatar);
  });

  elements.avatarForm.addEventListener('submit', handleAvatarFormSubmit);
}

// Инициализация проекта
enableValidation(validationSettings);
initializeUserProfile();
initializeEventListeners();

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.popup').forEach(popup => {
    popup.classList.add('popup_is-animated');
  });
});
