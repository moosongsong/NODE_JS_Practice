var exp = require('express');
const port = 80;
var server = exp();

server.listen(port, function(){
  console.log(port+"연결...");

});

server.use(exp.static('public'));
//request는 클라이언트에서 서버 데이터를 보낼때 사용되는 객체
//response는 서버에서 클라이언트로 데이터를 전송할때 사용되는 객체
server.use(function(req, res){
  console.log("요청이 접수되었다.");
  res.send('<h1>안녕!</h1>')
});
