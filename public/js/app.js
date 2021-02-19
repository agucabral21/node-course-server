console.log("Client side js loaded");

const address = "Boston";




const weatherForm = document.querySelector("form");
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const forecastIcon = document.querySelector('#forecastIcon');

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault()

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  const url = "/weather?address=" + search.value;
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error)  messageOne.textContent = data.error;
      else {
          console.log(data.icon)
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
          forecastIcon.setAttribute('src', data.icon)
        }
    });
  });
});
