var ajaxCall = function(jobId) {
  var timer = setInterval(function(){
    console.log(jobId);
    $.ajax({
      type: 'get',
      url: '/status/' + jobId
    }).done(function(response){
    console.log(response);
    console.log(typeof response);
    if (response === 'true') {
      clearInterval(timer);
      $('#spinner').hide();
      $("input[name='tweet']").val('');
      $('form').show();
      alert("Your tweet was sent!");
    }
  });
  }, 1000);
};

$(document).ready(function() {
  $('#spinner').hide();
  $('form').on('submit', function(e){
    e.preventDefault();
    $('form').hide();
    $('#spinner').show();
    var data = $(this).serialize();
    console.log(data);
    $.ajax({
      type: 'post',
      url: '/tweet',
      data: data
    }).done(ajaxCall);
  });
});