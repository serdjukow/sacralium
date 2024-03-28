const form = document.getElementById("form");
const getNameLink = "https://forum-dev.sacralium.game/forum/api/get_names";
const registerLink = "https://forum-dev.sacralium.game/forum/api/register";
const inputField = document.getElementById("name");
const updateNameButton = document.getElementById("update-name");
const formHint = document.querySelector(".form__hint");

const testLink = "./../data.json";

let names = [];
let currentIndex = 0;

async function getName() {
  try {
    const response = await fetch(testLink, {
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Ошибка HTTP: " + response.status);
    }
    const data = await response.json();
    names.push(...data.names);
    inputField.value = names[currentIndex];
    currentIndex = (currentIndex + 1) % names.length;
    validateInput();
  } catch (error) {
    console.error("Произошла ошибка:", error.message);
  }
}
getName();

function changeName() {
  if (names.length === 0) {
    getName();
    return;
  }
  inputField.value = names[currentIndex];
  currentIndex = (currentIndex + 1) % names.length;
}

function validateInput() {
  const inputValue = inputField.value.trim();
  const regex = /^[a-zA-Zа-яА-Я0-9_\- ]{3,20}$/;

  if (regex.test(inputValue)) {
    inputField.style.color = "green";
    inputField.style.borderColor = "green";
    inputField.validity.valid = true;
    inputField.setCustomValidity("");
    formHint.classList.remove('active')
  } else {
    inputField.style.color = "red";
    inputField.style.borderColor = "red";
    inputField.validity.valid = false;
    inputField.setCustomValidity("Пожалуйста, введите корректное значение.");
     formHint.classList.add("active");
  }
}

inputField.addEventListener("input", () => validateInput());

updateNameButton.addEventListener("click", () => {
  changeName();
  validateInput();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let formData = new FormData(form);
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });
  console.log(formObject);
  form.reset();
});

// https://sacralium.vercel.app/
// https://rc.sacralium.game/new-character
