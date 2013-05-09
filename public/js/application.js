var ajaxCall = function(jobId) {
  var timer = setInterval(function(){
    $.ajax({
      type: 'get',
      url: '/status/' + jobId
    }).done(function(response){
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
    $.ajax({
      type: 'post',
      url: '/tweet',
      data: data
    }).done(ajaxCall);
  });
});