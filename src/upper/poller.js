//= require jquery

// Used to poll the server to ask how well it getting on

// this module function is called with com.jivatechnology.Upper as 'this'
(function(){

  this.Poller = (function(){

    // Return the constructor
    return function(settings){

      // Extract required info from settings
      var result       = settings.result;
      var upload_id    = settings.upload_id;
      var progress_url = settings.progress_url;
      var interval     = settings.interval;
      var max_size     = settings.max_size;

      // Set the
      var poll_prepare = function(xhr) {
        xhr.setRequestHeader("X-Progress-ID", upload_id);
      };

      var too_big = function(size){
        if(max_size){
          return size > max_size;
        } else {
          return false;
        }
      };

      var poll_result = function(data){
        // change the width if the inner progress-bar
        switch( data.state )
        {
          case 'starting':
            // It's failed to track the upload
            // No progress bar will be available
            // Skip to processing stage
            result.uploaded();
            break;
          case 'uploading':
            // Tracking
            result.sizeTotal(data.size);
            result.sizeUploaded(data.received);
            // Trigger the results callbacks
            if(result.progress() >= 1){
              result.uploaded();
            } else if (too_big(data.size)) {
              result.errored("File is too large");
            } else {
              result.uploading();
            }
            break;
          case 'done':
            result.uploaded();
            break;
          case 'error':
            result.errored();
            break;
          case 'done':
            result.uploaded();
            break;
        }
      };

      // Private methods
      var poll = function(){
        $.ajax({
          type: "GET",
          url: progress_url,
          dataType: "json",
          beforeSend: poll_prepare,
          success: poll_result
        });
      };

      var timer;

      // Add callback to result
      result.onUpdate.add(function(r){
        if(r.hasStarted()){
          // Schedule a check as we must still be uploading
          timer = window.setTimeout( poll, interval );
        } else {
          // Cancel any checks
          window.clearTimeout(timer);
          timer = null;
        }
      });

    };

  })();

}).call(com.jivatechnology.Upper);
