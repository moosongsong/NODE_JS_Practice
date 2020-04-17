var images=[
  {name:'a.jpg', location:'public/a.jpg'},
  {name:'b.jpg', location:'public/b.jpg'},
  {name:'c.jpg', location:'public/c.jpg'},
  {name:'d.jpg', location:'public/d.jpg'},
  {name:'e.jpg', location:'public/e.jpg'},
  {name:'f.jpg', location:'public/f.jpg'},
  {name:'g.jpg', location:'public/g.jpg'}
];


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

  socket.on('addimg', function(data) {//add
    let temp=-1;
    for (var i = 0; i < images.length; i++) {
      if(images[i].name == data){
        temp = i;
        break;
      }
    }
    if(temp != -1){
      socket.emit('completeAdd', images[temp].location);
    }
    else{
      socket.emit('fail', data);
    }
  });

  socket.on('dropimg', function(data) {//drop
    let temp=-1;
    for (var i = 0; i < images.length; i++) {
      if(images[i].name == data){
        temp = i;
        break;
      }
    }
    if(temp != -1){
      socket.emit('completeDrop', images[temp].name);
    }
    else{
      socket.emit('fail', data);
    }
  });
});
