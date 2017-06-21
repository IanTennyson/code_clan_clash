var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const users = [];

app.use(express.static('client/build'));

io.on('connection', function(socket){
  let email = "";

  socket.on('typed', (typedEvent) => {
    for(var user of users) {

      if(user.user === typedEvent.user.userName) {
        user.wpm = typedEvent.wpm
      }
    }
    io.sockets.emit('joined', users);
  });

  socket.on('disconnect', () => {
    deleteFromArray(users, email);
    io.sockets.emit('joined', users);
  });

  function deleteFromArray(my_array, element) {
    let index = -1;
    for(var i=0;i<my_array.length;i++) {
      if(my_array[i].user === element) {
        index = i;
      }
    }
    if(index > -1) {
      my_array.splice(index, 1);      
    }
  }

  socket.on('joined', (user) => {
    email = user;
    users.push({user: email, wpm: 0, id: socket.id });
    io.sockets.emit('joined', users);
  });
});

var server = http.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('CodeClanClash running on http://%s:%s', host, port);
});
