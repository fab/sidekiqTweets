var ajaxCall = function(jobId) {
  var timer = setInterval(function(){
    console.log(jobId);
    $.ajax({
      type: 'get',
      url: '/status/' + jobId
    }).done(function(response){
    // show a spinner
    clearInterval(timer);
    alert("Your tweet was sent!");
  });
  }, 1000);
};

$(document).ready(function() {
  $('form').on('submit', function(e){
    e.preventDefault();
    var data = $(this).serialize();
    console.log(data);
    $.ajax({
      type: 'post',
      url: '/tweet',
      data: data
    }).done(ajaxCall);
  });
});