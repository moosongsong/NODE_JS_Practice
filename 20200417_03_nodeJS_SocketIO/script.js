$(document).ready(function() {
  //client
  // var socket = io('http://localhost:8080');
  // socket.on('message', function(data){
  //   $('textarea').val($('textarea').val() + data+'\n');
  // });
  // $('button').click(function(){
  //   socket.emit('message', $('#msg').val());
  // });

  var socket = null;

  $('.intro > button').click(function() {
    if ($(this).siblings('#name').val().trim() == '') {
      alert("insert your name");
      return;
    }

    socket = io('http://192.168.30.188:8080');

    socket.on('hello', function(data) {
      $('textarea').val('').val(data + '\n');
    });

    socket.on('msg', function(data) {
      $('textarea').val($('textarea').val() + data + '\n');
    });

    socket.emit('who', $(this).siblings('#name').val().trim());
  });



  $('.action > button').click(function() {
    if (socket == null) {
      alert("채팅서버에 접속후 사용하시기 바랍니다.");
      return;
    }
    if ($('#msg').val().trim() != '') {
      socket.emit('msg', $('#msg').val());
    }
  });

  $('#msg').keyup(function(e) {
    if (e.keyCode == 13) {
      $('.action>button').trigger('click');
    }
  });

});
