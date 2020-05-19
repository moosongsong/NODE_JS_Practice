//문자열이 비었는지 확인하기
String.prototype.isEmpty = function() {
  return (this.trim() == '');
}

$.fn.isEmpty = function() {
  return ($(this).val().trim() == '');
}

$.fn.equals = function(obj) {
  return ($(this).val() == obj.val());
}

$.refresh = function(){
  $.ajax({
    url: '/members',
    type: 'get',
    success: function(data) {
      $('.memberList').empty();
      let ul = $('<ul/>');
      $('<li/>', {
        text: '이메일'
      }).appendTo(ul);
      $('<li/>', {
        text: '별명'
      }).appendTo(ul);
      $('<li/>', {
        text: '가입날짜'
      }).appendTo(ul);
      $('<li/>', {
        text: '탈퇴여부'
      }).appendTo(ul);
      ul.appendTo($('.memberList'));

      for (var i = 0; i < data.length; i++) {
        let ul = $('<ul/>');
        $('<li/>', {
          text: data[i].email
        }).appendTo(ul);
        $('<li/>', {
          text: data[i].nick
        }).appendTo(ul);
        $('<li/>', {
          text: data[i].redgate
        }).appendTo(ul);
        if (!data[i].removeat) {
          $('<li/>', {
            text: '가입중'
          }).appendTo(ul);
        } else {
          $('<li/>', {
            text: data[i].removeat
          }).appendTo(ul);
        }
        ul.appendTo($('.memberList'));
      }
    }
  });
}


$(document).ready(function() {
  var socket = io('http://192.168.30.188:8080');

  socket.on('refresh', function(){
    $.refresh();
  });
  $.refresh();

  $('button').click(function() {

    $('#btnRegister').click(function() {
      if ($('#email').val().isEmpty()) {
        alert("insert your email!");
        $('#email').val('').focus();
        return;
      }

      if ($('#nick').isEmpty()) {
        alert("insert your nick name!");
        return;
      }

      if ($('#password').isEmpty()) {
        alert("insert your password!");
        return;
      }

      if (!$('#password').equals($('#password2'))) {
        alert("비밀번호가 일치하지 않습니다.");
        $('#password2').val('').focus();
        return;
      }

    });
    $.ajax({
      url: '/members',
      type: 'post',
      data: {
        email: $('#email').val(),
        nick: $('#nick').val(),
        password: $('#password').val()
      },
      success: function(data) {
        switch (data) {
          case 0:
            alert(data.message);
            break;
          case 1:
            alert(data.message);
            $('#email').val('').focus();
            break;
          case 2:
            alert(data.message);
            $('#nick').val('').focus();
            break;
          case 3:
            alert(data.message);
            $('#password').val('').focus();
            $('#password2').val('');
            break;
          default:
            alert(data.message);
            break;
        }
        console.log(data);
      }
    });
  });


});
