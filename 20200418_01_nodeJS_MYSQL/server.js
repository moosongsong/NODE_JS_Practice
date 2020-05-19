const port = 80;
var express = require('express');
var mysql = require('mysql');
var bodypaser = require('body-parser');
var io = require('socket.io')(8080);

io.on('connection', function(socket){
  console.log(socket.id);
});

var app = express();

var conn = mysql.createConnection({
  host: '192.168.30.188',
  user: 'nodejs',
  password: '1234',
  database: 'nodejs'
});

String.prototype.isEmpty = function(){
  return(this.trim() == '');
}

app.use(bodypaser.urlencoded({extended:false}));
app.use(express.static('.'));

app.listen(port, function(){
  console.log(port+' is connected');
});

app.get('/members', function(request, response){
  conn.query('select * from members', function(error, result){
    response.send(result);
  });
});

app.post('/members', function(request, response){
  let email = request.body.email;
  let nick = request.body.nick;
  let password = request.body.password;
  console.log(email+','+nick+','+password);

  if (email.isEmpty()) {
    response.send({errno:1, message:'전자메일 주소가 입력이 안됨.'});
    return;
  }
  if (nick.isEmpty()) {
    response.send({errno:2, message:'별명을 입력하지 않았습니다.'});
    return;
  }
  if (password.isEmpty()) {
    response.send({errno:3, message:'비밀번호가 입력되지 않았습니다.'});
    return;
  }

  conn.query('insert into members(email, nick, keyString)'+
    'values(\''+email+'\',\''+nick+'\',password(\''+password+'\'))', function(error){
    if (error) {
      response.send({errno:9, message:'SQL 오류가 발생함'});
      return;
    }
    io.emit('refresh', '회원목록 갱신요망');
    response.send({errno:0, message:'회원가입이 정상적으로 처리됨'});
  });
});
