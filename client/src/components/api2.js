// import openSocket from 'socket.io-client';


function  messenger(textToSend, socket) {

 socket.emit("send", textToSend);
         this.socket.emit('send', textToSend);
         console.log("send " + textToSend + " to server");
        
}

export {  messenger };