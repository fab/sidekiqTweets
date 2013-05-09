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
    $('#tweet_text').val('');
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