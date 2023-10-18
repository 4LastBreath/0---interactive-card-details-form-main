const cardName = document.querySelector('.front-card_name')
const cardNumber = document.querySelector('.front-card_card-number')
const cardMonth = document.querySelector('.front-card_month')
const cardYear = document.querySelector('.front-card_year')
const cardCvc = document.querySelector('.back-card_cvc')


window.addEventListener('load', () => {
  const savedNameValue = localStorage.getItem('nameValue');
  const savedNumberValue = localStorage.getItem('numberValue');
  const savedMonthValue = localStorage.getItem('monthValue');
  const savedYearValue = localStorage.getItem('yearValue');
  const savedCvcValue = localStorage.getItem('cvcValue');

  if (savedNameValue) {
    cardName.textContent = savedNameValue;
  }

  if (savedNumberValue) {
    cardNumber.textContent = savedNumberValue;
  }

  if (savedMonthValue) {
    cardMonth.textContent = savedMonthValue;
  }

  if (savedYearValue) {
    cardYear.textContent = savedYearValue;
  }

  if (savedCvcValue) {
    cardCvc.textContent = savedCvcValue;
  }
});