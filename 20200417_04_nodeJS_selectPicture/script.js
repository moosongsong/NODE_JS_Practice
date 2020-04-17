var images = new Array();
var options = new Array();

function insert(data){
  var temp = data;
  strs = temp.split('/');
  temp = strs[1];
  alert(temp);
  $('<option/>', {text: temp}).appendTo($('.pics'));
  images.push(data);
  options.push(temp);
}

function dropdrop(data){
  let idx = options.indexOf(data);
  images.splice(idx, 1);
  options.splice(idx, 1);
  $('select').empty();
  for (var i = 0; i < options.length; i++) {
    $('<option/>',{text:options[i]}).appendTo($('select'));
  }
}

$(document).ready(function() {
  insert('../select images');
  insert('public/a.jpg');
  images[0] = '';

  var socket = io('http://192.168.30.188:8080');

  socket.on('completeAdd', function(data) {//root data
    insert(data);
    alert('요청하신 처리가 완료되었습니다');
  });
  socket.on('completeDrop', function(data) {//root data
    if(options.indexOf(data) <0){
      return;
    }
    dropdrop(data);
    alert('요청하신 처리가 완료되었습니다');
  });

  socket.on('fail', function(data) {
    alert(data+ '에 대한 처리가 실패되었습니다');
  });


  $('.action > button[name=button1]').click(function() {//ADD
    if ($('#msg').val().trim() != '') {
      socket.emit('addimg', $('#msg').val());
    }
  });

  $('.action > button[name=button2]').click(function() {//DROP
    if ($('#msg').val().trim() != '') {
      socket.emit('dropimg', $('#msg').val());
    }
  });

  $('div.intro > select.pics').change(function(){
    let temp = $('option:selected').index();
    $('.screen >img').attr("src", images[temp]);
  });
});
