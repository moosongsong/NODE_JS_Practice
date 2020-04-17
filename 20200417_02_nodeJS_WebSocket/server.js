const port = 80;
var app = require('http').createServer(handler);
var io = require('socket.io')(app);//클라이언트와 서버가 주고받는 객체
var fs = require('fs');
app.listen(port, function(){
  console.log('port...');
});

function handler(request, response){
  fs.readFile(__dirname+'/index.html', function(error, data){
    if (error) {
      response.writeHead(500);
      return response.end('지정한 파일을 찾을 수 없습니다.');
    } else {
      response.writeHead(200);
      return response.end(data);
    }
  });
}
