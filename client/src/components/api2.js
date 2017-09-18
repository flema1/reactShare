// import openSocket from 'socket.io-client';
// const  socket = openSocket('http://localhost:3001');

function  messenger(textToSend) {
  let textArea = document.querySelector("textarea");
  var textToSend = textArea.value;
  socket.emit("send", textToSend);
         this.socket.emit('send', textToSend);
         console.log("send " + textToSend + " to server");
        
}

export {  messenger };