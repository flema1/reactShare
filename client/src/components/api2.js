import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3001');






function  messenger(textToSend) {
    // var textToSend = textArea.value;

         
 socket.emit("send", textToSend);

 socket.on("message-from-friend", function(text) {


          // 13. when we receive a "message-from-friend" event
          //     this callback is executed. the text variable
          //     here is has the exact value of the event variable
          //     in step 12
          console.log(text);
        });
          console.log("send " + textToSend + " to server");
          
  
}

export {  messenger };
