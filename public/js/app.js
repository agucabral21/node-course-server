console.log("Client side js loaded");

const address = "Boston";




const weatherForm = document.querySelector("form");
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener("submit", (event) => {
  event.preventDefault()
  const url = "/weather?address=" + search.value;
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error)  messageOne.textContent = data.error;
      else {
          console.log(data)
        messageOne.textContent = data.data.location;
          messageTwo.textContent = "Temperature: " + data.data.temperature +" It's Like "+ data.data.description;
        }
    });
  });
});
