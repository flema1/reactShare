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

app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

app.use(express.static('public')); // static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log(`listening on port ${PORT} 00`);
});






const reactShareRouter = require('./routes/reactShare-routes');
app.use('/rShare', reactShareRouter);

const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);
const userRoutes = require('./routes/user-routes');
app.use('/user', userRoutes);

app.use('*', (req, res) => {
  res.status(400).json({
    message: 'Endpoint not found!',
  });
});


 

//var https = require('https'),     
 var   fs =    require('fs');        

var options = {
    key: fs.readFileSync(__dirname + '/server.key'),
    cert:   fs.readFileSync(__dirname+'/server.crt')
};

//io = require('socket.io').listen(server);     //socket.io server listens to https connections
//app.listen(8895, "0.0.0.0");


//var https -
//var server = require('https').createServer(options, app);
var server = require('https').createServer(options, app);
//var server = https.createServer(options);
 var io= require('socket.io')(server);
 

 //var server = require('http').createServer(app);
 //var io= require('socket.io')(server);
 
// server.listen(3001);
server.listen(options,PORT);
 
 io.on('connection', function(socket) {

  //socket.join('some room');

   console.log("new connection from " + socket.id);
   socket.on("send", function(event) {
     console.log("got an event!");
     console.log(event);
     socket.broadcast.emit("message-from-friend", event);
     
   });
   socket.on("share", function(data) {
     console.log("got a  share!");
   
     console.log(data.incoming +" // "+data.current);
     socket.broadcast.emit("share-from-peer", data.current);
     
   });

 //socket.disconnect();
  // socket.on('disconnect', function () {
  //               socket.removeAllListeners('send message');
  //               socket.removeAllListeners('disconnect');
  //               socket.removeAllListeners('connection');
  //           });

  

 });
 