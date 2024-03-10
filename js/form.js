const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let formData = new FormData(form);
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });
  console.log(formObject);
});
