console.log('Hello from Front');

let socket = new WebSocket('ws://localhost:8080');

const messages = document.getElementById('messages');

socket.onopen = function (e) {
  console.log('[open] Соединение установлено');
};

socket.onmessage = function (event) {
  console.log(`[message] Данные получены с сервера: ${event.data}`);
  messages.innerHTML += `<li>${event.data}</li>`;
};

socket.onerror = function (error) {
  console.log(`[error] ${error.message}`);
};

socket.onclose = function (event) {
  if (event.wasClean) {
    console.log(
      `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
    );
  } else {
    // например, сервер убил процесс или сеть недоступна
    // обычно в этом случае event.code 1006
    console.log('[close] Соединение прервано');
  }
};

document.forms[0].addEventListener('submit', (event) => {
  event.preventDefault();
  const newMessage = event.target.text.value;
  socket.send(newMessage);
  event.target.text.value = '';
});
