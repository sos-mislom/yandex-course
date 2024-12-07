// Показ ошибки
function showError(input, errorElement, settings) {
  errorElement.textContent = input.validity.valueMissing
    ? 'Вы пропустили это поле.'
    : input.validity.typeMismatch && input.type === 'url'
    ? 'Не ссылка'
    : input.validity.tooShort
    ? `Минимум: ${input.minLength}, сейчас: ${input.value.length}.`
    : input.validationMessage;

  errorElement.classList.add(settings.errorClass);
  input.style.borderColor = '#FF0000';
}

// Скрытие ошибки
function hideError(input, errorElement, settings) {
  errorElement.textContent = '';
  errorElement.classList.remove(settings.errorClass);
  input.style.borderColor = '';
}

// Проверка поля
function checkInputValidity(input, form, settings) {
  const errorElement = form.querySelector(`.popup__error_type_${input.name}`);
  input.validity.valid ? hideError(input, errorElement, settings) : showError(input, errorElement, settings);
}

// Состояние кнопки
function toggleButtonState(inputs, button, settings) {
  const isValid = inputs.every(input => input.validity.valid);
  button.classList.toggle(settings.inactiveButtonClass, !isValid);
  button.disabled = !isValid;
}

// Установка обработчиков
function setEventListeners(form, settings) {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const button = form.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputs, button, settings);

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(input, form, settings);
      toggleButtonState(inputs, button, settings);
    });
  });
}

// Включение валидации
export function enableValidation(settings) {
  document.querySelectorAll(settings.formSelector).forEach(form => setEventListeners(form, settings));
}
