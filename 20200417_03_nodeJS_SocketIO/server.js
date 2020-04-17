const port = 80;
var express = require('express');
var app = express();
var io = require('socket.io')(8080);


app.listen(port, function() {
  console.log(port + " Connected......");
});

app.use(express.static('.'));
//웹서버는 express가 다 한다.

io.on('connection', function(socket) {
  let id = socket.id; //각각의 클라이언트들에 대한 정보
  let user = null;
  console.log('client is Connected : ' + id);


  socket.emit('hello', '채팅서버에 접속되었습니다.');

  socket.on('who', function(data) {
    user = data;
    console.log('소켓[' + id + '] 의 사용자 명이 ' + user + "으로 지정되었다.");
  });


  socket.on('msg', function(data) {
    io.emit('msg', user + '> ' + data);
  });
});
