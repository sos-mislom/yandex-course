// Функции открытия и закрытия модальных окон
function openModal(popup) {
  popup.classList.add("popup_is-opened");
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

// Модальные окна
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

// Элементы модального окна для изображения
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");

// Форма профиля
const profileForm = profilePopup.querySelector(".popup__form");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = profilePopup.querySelector(".popup__input_type_name");
const profileDescriptionInput = profilePopup.querySelector(".popup__input_type_description");

// Форма добавления карточки
const cardForm = cardPopup.querySelector(".popup__form");
const cardNameInput = cardPopup.querySelector(".popup__input_type_card-name");
const cardLinkInput = cardPopup.querySelector(".popup__input_type_url");

// Функция добавления обработчиков событий для карточки
function addCardHandlers(card, name, link) {
  const image = card.querySelector(".card__image");
  image.addEventListener("click", () => {
    imagePopupImage.src = link;
    imagePopupImage.alt = name;
    imagePopupCaption.textContent = name;
    openModal(imagePopup);
  });

  const likeButton = card.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => likeButton.classList.toggle("card__like-button_is-active"));

  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteButton.closest(".card").remove());
}

// Функция создания карточки
function createCard({ name, link }) {
  const template = document.querySelector("#card-template").content;

  const card = template.cloneNode(true);

  const image = card.querySelector(".card__image");
  image.src = link;
  image.alt = name;

  card.querySelector(".card__title").textContent = name;

  addCardHandlers(card, name, link);

  return card;
}

// Добавление стартовых карточек на страницу
const cards = initialCards.map(createCard);
const places = document.querySelector(".places__list");
places.append(...cards);

// Обработчики для профиля
function handleProfileEdit() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profilePopup);
}

function handleProfileFormSubmit(e) {
  e.preventDefault();

  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closeModal(profilePopup);
}

// Обработчики для карточек
function handleAddCard() {
  cardNameInput.value = "";
  cardLinkInput.value = "";
  openModal(cardPopup);
}

function handleCardFormSubmit(e) {
  e.preventDefault();

  const newCard = createCard({ name: cardNameInput.value, link: cardLinkInput.value });
  places.prepend(newCard);

  closeModal(cardPopup);
}

// Добавление обработчиков событий
imagePopupCloseButton.addEventListener("click", () => closeModal(imagePopup));
profilePopup.querySelector(".popup__close").addEventListener("click", () => closeModal(profilePopup));
profileForm.addEventListener("submit", handleProfileFormSubmit);
document.querySelector(".profile__edit-button").addEventListener("click", handleProfileEdit);

cardPopup.querySelector(".popup__close").addEventListener("click", () => closeModal(cardPopup));
cardForm.addEventListener("submit", handleCardFormSubmit);
document.querySelector(".profile__add-button").addEventListener("click", handleAddCard);
