ajaxCall = function(jobId) {
  $.ajax({
    type: 'get',
    url: '/status/' + jobId
  }).done(function(response){
    console.log(response);
    if (response === true) {
      jobIsDone = true;
      alert("Your tweet was sent!");
    }
  });
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
    }).done(function(response) {
      console.log("got here");
      console.log(response);
      var jobId = response;
      console.log(jobId);
      var jobIsDone = false;
      //while (jobIsDone === false) {
      for (var i=0; i<10; i++) {
        // console.log(ajaxCall);
        setTimeout(ajaxCall(jobId), 1000);
      }
    });
  });
});