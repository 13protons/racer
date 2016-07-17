var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

console.log('game available at http://localhost:3000')
server.listen(3000);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/ctrl', function (req, res) {
  res.sendFile(__dirname + '/control.html');
});

app.use('/vendor', express.static('bower_components'));
app.use('/public', express.static('public'));

io.on('connection', function (socket) {
  socket.on('btn', function (data) {
    console.log(data);
    io.emit('ctrl', data);
  });
});
