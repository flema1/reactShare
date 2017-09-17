const express = require('express')
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const app = express();

require('dotenv').config();
app.use(logger('dev'));

// middlewares
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// static files
app.use(express.static('public'));


//Express app set up 
//setting up port & listen 
 const PORT = process.env.PORT || 4000;

app.listen(PORT, function() {
  console.log(`listening on port ${PORT} 00`);
});





app.get('/', (req, res) => {
  res.send('We are live!');
});

const reactShareRouter = require('./routes/reactShare-routes');
app.use('/rShare', reactShareRouter);



app.use('*', (req, res) => {
  res.status(400).json({
    message: 'Endpoint not found!',
  });
});



var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(3001);
io.on('connection', function(socket) {
  console.log("new connection from " + socket.id);
  socket.on("send", function(event) {
    console.log("got an event!");
    console.log(event);
    socket.broadcast.emit("message-from-friend", event);
  });
});








