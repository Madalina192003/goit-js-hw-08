import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

initializeForm();

// Adaugă un event listener pentru input-ul din formular
form.addEventListener('input', throttle(onFormInput, 500));

// Adaugă un event listener pentru submit-ul formularului
form.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  const formData = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

function initializeForm() {
  const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedData) {
    const { email, message } = JSON.parse(savedData);
    form.elements.email.value = email || '';
    form.elements.message.value = message || '';
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  const formData = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };

  console.log('Form submitted with data:', formData);

  // Șterge datele
  localStorage.removeItem(LOCAL_STORAGE_KEY);

  // Resetează formularul
  form.reset();
}
