var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.broadcast.emit('hi');

  socket.on('hi', function(){
    io.emit('hi');
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    // console.log('message: ' + msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
    socket.broadcast.emit('logout');
  });

  socket.on('logout', function(){
    console.log('logout event');
    io.emit('logout');
  });
});

http.listen('3000', function(){
  console.log('listening on *:3000');
});
