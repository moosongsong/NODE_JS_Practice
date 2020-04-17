const port = 80;

var express = require('express');

var app = express();

app.listen(port, function(){
  console.log(port + " is connected...");
});

app.use(express.static('public'));

// app.get('/', function(request, response){
//   console.log('addr : localhost, method:get');
//   response.send('get response')
// });
//
// app.post('/', function(request, response){
//   console.log('addr : localhost, method:post');
//   response.send('post response')
// });




//reatfull 방식.... 각 방식에 따라 하는 작업이 다르게 하는 것.
//요청 http://localhost/board?name=값
app.get('/board', function(request, response){
  let jobj = new Array();
  var query = request.query;

  for (var key in query) {
    let obj = new Object;
    obj[key] = query[key];
    jobj.push(obj);
  }

  // console.log(request.query.name);
  // console.log('게시글 목록보기 요청이 들어왔다.');
  response.send(jobj);
});

app.post('/board', function(request, response){
  console.log('게시글 등록 요청이 들어왔다');
  response.send('게시글 등록 요청이 접수되었다')
});

app.delete('/board', function(request, response){
  console.log('게시글 삭제 요청이 들어왔다');
  response.send('게시글 삭제 요청이 접수되었다')
});

app.patch('/board', function(request, response){
  console.log('게시글 편집 요청이 들어왔다');
  response.send('게시글 편집 요청이 접수되었다')
});
