// This is used to simulate a file upload so no server setup is required
// to build and test the UI


(function( $ ) {

  // Helper to generate random number between two values
  var random = function(smallest,largest){
    var scale = largest - smallest;
    return Math.round(Math.random() * scale + smallest);
  };

  // Units
  var kb  = 1024;      // 1024 bytes
  var mb  = kb * 1024; // 1024 KB
  var sec = 1000;      // 1000 ms

  $.fn.upper_stub = function(settings){

    return this.each(function(){

      var $form = $(this);
      $form.unbind('submit');
      $form.submit(function(event){
        var scope = com.jivatechnology.Upper;

        var $form = $(this);
        var file = new scope.File($form.find("input:first[type=file]").val());

        var result = new scope.Result({
          file: file,
          onUpdate: settings.onUpdate
        });

        // Decide how big file is in bytes
        var size = random(10 * kb, 10 * mb);

        var upload_speed = (100 * kb) / sec;
        var processing_time = random(2*sec, 10*sec);
        var interval = 2000;
        var timeToUpload = (size / upload_speed);
        var timeToComplete = timeToUpload + processing_time;

        result.uploading();
        var timeStart = new Date();

        var isTooBig = function(){
          if(settings.max_size){
            return size > settings.max_size;
          } else {
            return false;
          }
        };

        var timer = setInterval(function(){
          var timeUploading = new Date() - timeStart;
          var uploaded      = timeUploading * upload_speed;

          if(timeUploading > timeToComplete){
            result.completed();
            clearInterval(timer);
          } else if (timeUploading > timeToUpload) {
            result.sizeUploaded(uploaded);
            result.uploaded();
          } else {
            result.sizeTotal(size);
            result.sizeUploaded(uploaded);
            if(isTooBig()){
              result.errored("File is too large");
            } else {
              result.uploading();
            }
          }
        }, interval);

        // Don't really submit the form
        return false;
      });

    });

  };

})( jQuery );
