$(document).ready(function() {
  $('button').click(function(){
    let name = $('input[name=name]').val();
    let age = $('input[name=age]').val();

    $.ajax({
      url: '/board',
      type: 'post',
      data:{name:name, age:age},
      success: function(data){
        if(data.result){
          console.log(data.message);
        }
        else{
          console.log(data.message);
        }
      }
    });
  });
});
