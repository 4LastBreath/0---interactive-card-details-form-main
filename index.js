const button = document.getElementById('btn-submit')

const formName = document.getElementById('form_name')
const formNumber = document.getElementById('form_card-number')
const formMonth = document.getElementById('form_card-date-mm')
const formYear = document.getElementById('form_card-date-yy')
const formCvc = document.getElementById('form_card-cvc')

const cardName = document.querySelector('.front-card_name')
const cardNumber = document.querySelector('.front-card_card-number')
const cardMonth = document.querySelector('.front-card_month')
const cardYear = document.querySelector('.front-card_year')
const cardCvc = document.querySelector('.back-card_cvc')

const allErrors = document.querySelectorAll('.error')
const allInputs = document.querySelectorAll('.input')


formNumber.addEventListener('input', (e) => {
  let inputValue = e.target.value;

  if (inputValue.length > 19) {
    inputValue = inputValue.slice(0, 19);
  }

  const formattedValue = formatCardNumber(inputValue);
  cardNumber.textContent = formattedValue;
  e.target.value = formattedValue;

  if (!formattedValue) {
    cardNumber.textContent = '0000 0000 0000 0000'
  }

  localStorage.setItem('numberValue', e.target.value);
});

formName.addEventListener('input', (e) => {
  let inputValue = e.target.value;

  cardName.textContent = inputValue;

  if (!inputValue) {
    cardName.textContent = 'Jane Appleseed'
  }

  localStorage.setItem('nameValue', e.target.value);
})

formMonth.addEventListener('input', (e) => {
  let inputValue = e.target.value;
  inputValue = inputValue.replace(/\D/g, '');

  if (inputValue.length > 2) {
    inputValue = inputValue.slice(0, 2);
  }

  e.target.value = inputValue;
  cardMonth.textContent = inputValue;

  if (!inputValue) {
    cardMonth.textContent = '00';
  }

  localStorage.setItem('monthValue', e.target.value);
});

formYear.addEventListener('input', (e) => {
  let inputValue = e.target.value;
  inputValue = inputValue.replace(/\D/g, '');

  if (inputValue.length > 2) {
    inputValue = inputValue.slice(0, 2);
  }

  e.target.value = inputValue;
  cardYear.textContent = inputValue;

  if (!inputValue) {
    cardYear.textContent = '00';
  }

  localStorage.setItem('yearValue', e.target.value);
});

formCvc.addEventListener('input', (e) => {
  let inputValue = e.target.value;
  inputValue = inputValue.replace(/\D/g, '');

  if (inputValue.length > 3) {
    inputValue = inputValue.slice(0, 3);
  }

  e.target.value = inputValue;
  cardCvc.textContent = inputValue;

  if (!inputValue) {
    cardCvc.textContent = '000';
  }

  localStorage.setItem('cvcValue', e.target.value);
});

window.addEventListener('load', () => {
  allInputs.forEach(inputElement => {
    inputElement.value = '';
  });

  localStorage.clear();
});


button.addEventListener('click', validateForm);

function formatCardNumber(input) {
  const inputWithoutSpaces = input.replace(/ /g, '');
  const chunkSize = 4;
  const regex = new RegExp(`.{1,${chunkSize}}`, 'g');
  const chunks = inputWithoutSpaces.match(regex);

  if (chunks) {
    return chunks.join(' ');
  } else {
    return '';
  }
}

function displayError(inputElement, errorElement, errorMessage) {
  errorElement.textContent = errorMessage;
  errorElement.classList.add('invalid');
  inputElement.classList.add('invalid');
}

function removeErrors() {
  allErrors.forEach(errorElement => {
    errorElement.textContent = '';
    errorElement.classList.remove('invalid');
  });

  allInputs.forEach(inputElement => {
    inputElement.classList.remove('invalid')
  }) 
}


function validateForm(e) {

  e.preventDefault();

  const nameValue = formName.value;
  const numberValue = formNumber.value.replace(/ /g, '');
  const monthValue = formMonth.value;
  const yearValue = formYear.value;
  const cvcValue = formCvc.value;

  removeErrors()

  let isValid = true;

  if (!nameValue) {
    displayError(formName, allErrors[0], "Can't be blank");
    isValid = false;
  } else {

    const nameWords = nameValue.split(' ');
  
    if (nameWords.length < 2) {
      displayError(formName, allErrors[0], "Wrong format");
      isValid = false;
    }
  }

  if (!numberValue) {
    displayError(formNumber, allErrors[1], "Can't be blank");
    isValid = false;
  } else if (!/^[0-9 ]+$/.test(numberValue)) {
    displayError(formNumber, allErrors[1], "Wrong format, numbers only");
    isValid = false;
  } else if (numberValue.length !== 16) {
    displayError(formNumber, allErrors[1], "Wrong format, too short");
    isValid = false;
  }

  if (!monthValue) {
    displayError(formMonth, allErrors[2], "Can't be blank");
    isValid = false;
  } else if (monthValue.length === 1) {
    displayError(formMonth, allErrors[2], "Wrong format");
    isValid = false;
  } else if (monthValue > 12) {
    displayError(formMonth, allErrors[2], "Wrong format");
    isValid = false;
  }

  if (!yearValue) {
    displayError(formYear, allErrors[2], "Can't be blank");
    isValid = false;
  } else if (yearValue.length === 1) {
    displayError(formYear, allErrors[2], "Wrong format");
    isValid = false;
  } else {

    const currentYear = new Date().getFullYear() % 100;
    const selectedYear = parseInt(yearValue);
  
    if (selectedYear < currentYear) {
      displayError(formYear, allErrors[2], "Can't be a expired card");
      isValid = false;
    }
  }

  if (!cvcValue) {
    displayError(formCvc, allErrors[3], "Can't be blank")
    isValid = false;
  } else if (cvcValue.length < 3) {
    displayError(formCvc, allErrors[3], "Wrong format");
    isValid = false;
  }

  if (isValid) {
    window.location.href = `thanks.html`;
  }

}
