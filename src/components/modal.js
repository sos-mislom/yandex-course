// Открыть модальное окно
export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  modal.addEventListener('click', handleOverlayClick);
  document.addEventListener('keydown', handleEscClose);

  const closeButton = modal.querySelector('.popup__close');
  if (closeButton) {
    closeButton.addEventListener('click', () => closeModal(modal));
  }
}

// Закрыть модальное окно
export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  modal.removeEventListener('click', handleOverlayClick);
  document.removeEventListener('keydown', handleEscClose);
  clearValidationErrors(modal);
  disableSubmitButton(modal);
}

// Очистить ошибки валидации
function clearValidationErrors(modal) {
  modal.querySelectorAll('.popup__error').forEach(error => {
    error.textContent = '';
    error.classList.remove('popup__error_visible');
  });

  modal.querySelectorAll('.popup__input').forEach(input => {
    input.style.borderColor = '';
  });
}

// Отключить кнопку отправки
function disableSubmitButton(modal) {
  const submitButton = modal.querySelector('.popup__button');
  if (submitButton) {
    submitButton.classList.add('popup__button_disabled');
    submitButton.setAttribute('disabled', true);
  }
}

// Закрыть окно при клике на оверлей
function handleOverlayClick(evt) {
  if (evt.target.classList.contains('popup_is-opened')) closeModal(evt.target);
}

// Закрыть окно при нажатии Escape
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector('.popup_is-opened');
    if (openedModal) closeModal(openedModal);
  }
}