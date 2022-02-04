"use strict";

//3. The 'Name' field
//Getting focus on the name input as soon as the page is loaded
function getFocus() {
  document.querySelector("input[id='name']").focus();
}
getFocus();

//4. "Job Role" Section
//selecting the other job role input and setting it's display to none as soon as the page loads
const otherJRole = document.querySelector("input[id = 'other-job-role']");

otherJRole.style.display = "none";

//select the select group for job roles
const jobRoleSelect = document.querySelector("select[id='title']");

//add event listener to the event group
//if the "other" input is selected in the job role select dropdown, the other job role input will be selected, if else, it will be hidden.
jobRoleSelect.addEventListener("change", (e) => {
  if (e.target.value === "other") {
    otherJRole.style.display = "initial";
  } else {
    otherJRole.style.display = "none";
  }
});

//5. T-shirt info section
//selecting the color select and disabling it.
const colorSelect = document.querySelector("select[id='color']");
colorSelect.style.display = "none";

//selecting design select and adding a change event
const designSelect = document.querySelector("select[id='design']");
//change event for designSelect that changges the colors based on which shirt design the user picks.
designSelect.addEventListener("change", (e) => {
  colorSelect.style.display = "initial";
  const colorOptions = colorSelect.options;
  console.log(colorOptions.length);
  const designOptions = designSelect.children;
  if (e.target.value === "js puns") {
    colorOptions[0].selected = true;
    for (let i = 0; i < colorOptions.length; i++) {
      colorOptions[i].style.display = "initial";
      if (
        colorOptions[i].textContent.includes("JS Puns") &&
        colorOptions[i].textContent !== "Select a design theme above"
      ) {
        continue;
      } else {
        colorOptions[i].style.display = "none";
      }
    }
  } else if (e.target.value === "heart js") {
    colorOptions[0].selected = true;
    for (let i = 0; i < colorOptions.length; i++) {
      colorOptions[i].style.display = "initial";
      if (
        colorOptions[i].value === "tomato" ||
        colorOptions[i].value === "steelblue" ||
        colorOptions[i].value === "dimgrey"
      ) {
        continue;
      } else {
        colorOptions[i].style.display = "none";
      }
    }
  }
});

//6 register for activities secion
const activitiesFieldset = document.querySelector("fieldset[id='activities']");
console.log(activities);

//sets the new total of the selected conferenes here
//everytime the if statement in the event listner below fires, this will update
let newTotal = 0;
activitiesFieldset.addEventListener("change", (e) => {
  const fieldsetChildren = activitiesFieldset.children;
  const activitiesDiv = fieldsetChildren[1].children;
  const total = fieldsetChildren[2];

  if (event.target.checked === true) {
    newTotal += Number(event.target.dataset.cost);
  } else {
    newTotal -= Number(event.target.dataset.cost);
  }

  total.textContent = `Total: $${newTotal}`;
});

//7. payment info section

const paymentSelect = document.querySelector('select[id="payment"]');
const paymentOptions = paymentSelect.children;
const bitcoinInfo = document.getElementById("bitcoin");
const paypalInfo = document.getElementById("paypal");

paypalInfo.style.display = "none";
bitcoinInfo.style.display = "none";

paymentOptions[1].selected = true;
//function for disabling and enabling based on select
function switchPayment(payment, close1, close2) {
  payment.style.display = "inherit";
  close1.style.display = "none";
  close2.style.display = "none";
}
paymentSelect.addEventListener("change", (e) => {
  const creditCardInfo = document.querySelector('div[id="credit-card"]');
  if (e.target.value === "credit-card") {
    switchPayment(creditCardInfo, paypalInfo, bitcoinInfo);
  } else if (e.target.value === "paypal") {
    switchPayment(paypalInfo, creditCardInfo, bitcoinInfo);
  } else if (e.target.value === "bitcoin") {
    switchPayment(bitcoinInfo, paypalInfo, creditCardInfo);
  }
});

//8. form validation
const entireForm = document.querySelector("form");

//helper functions - ALL USED TO VALIDATE ALL USER INPUT FIELDS
function nameValidator() {
  const name = document.querySelector("input[id='name']").value;
  const RegEx = /^[\w\s]{2,20}$/;
  return RegEx.test(name);
}

function emailValidator() {
  const email = document.querySelector('input[id="email"]').value;
  const RegEx = /^[^@]+@[^@.]+\.[a-z]+$/i;
  return RegEx.test(email);
}

function activitiesChecked() {
  let checkedCount = 0;
  let unChecked = 0;
  const activities = document.querySelectorAll("input[type='checkbox']");
  console.log(activities.length);
  for (let i = 0; i < activities.length; i++) {
    if (activities[i].checked) {
      checkedCount++;
    } else {
      unChecked++;
    }
  }
  if (checkedCount <= 0) {
    return false;
  } else {
    return true;
  }
}

function validateCreditNumb() {
  const creditNumber = document.querySelector("#cc-num").value;
  const creditRegex = /^\d{13,16}$/;
  const creditValid = creditRegex.test(creditNumber);
  return creditValid;
}

function validateZip() {
  const zipCode = document.querySelector("#zip").value;
  const zipRegex = /^\d{5}$/;

  const zipValid = zipRegex.test(zipCode);
  return zipValid;
}

function validateCVV() {
  const CVV = document.querySelector("#cvv").value;
  const cvvRegex = /^\d{3}$/;

  const cvvValid = cvvRegex.test(CVV);
  return cvvValid;
}
//helper function for adding errors to elemetns
function addError(element) {
  element.parentElement.classList.add("not-valid");
  element.parentElement.classList.remove("valid");
  element.parentElement.lastElementChild.style.display = "inline";
}
//help function for removing added erros
function removeError(element) {
  element.parentElement.classList.remove("not-valid");
  element.parentElement.classList.add("valid");
  element.parentElement.lastElementChild.style.display = "none";
}

//when form is submitted all code in here will executed
entireForm.addEventListener("submit", (e) => {
  const paymentSelect = document.querySelector("#payment");
  const name = document.querySelector("input[id='name']");
  const email = document.querySelector('input[id="email"]');
  const activitiesFieldset = document.querySelector("#activities-box");

  const creditNumber = document.querySelector("#cc-num");
  const zipCode = document.querySelector("#zip");
  const CVV = document.querySelector("#cvv");
  if (!nameValidator()) {
    e.preventDefault();
    addError(name);
  } else {
    removeError(name);
  }
  if (!emailValidator()) {
    e.preventDefault();
    addError(email);
  } else {
    removeError(email);
  }
  if (!activitiesChecked()) {
    e.preventDefault();
    addError(activitiesFieldset);
  } else {
    removeError(activitiesFieldset);
  }
  if (paymentSelect[1].selected) {
    if (!validateCreditNumb()) {
      e.preventDefault();
      addError(creditNumber);
    } else {
      removeError(creditNumber);
    }
    if (!validateZip()) {
      e.preventDefault();
      addError(zipCode);
    } else {
      removeError(zipCode);
    }
    if (!validateCVV()) {
      e.preventDefault();
      addError(CVV);
    } else {
      removeError(CVV);
    }
  }
});

//9 accessibility

//blur and focus events added to all checkboxes
function checkboxEventListener() {
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');

  for (let i = 0; i < allCheckboxes.length; i++) {
    allCheckboxes[i].addEventListener("focus", (e) => {
      allCheckboxes[i].parentElement.className = "focus";
    });
    allCheckboxes[i].addEventListener("blur", (e) => {
      allCheckboxes[i].parentElement.className = "";
    });
  }
}
//puts the function above into effect
checkboxEventListener();
