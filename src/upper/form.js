//= require jquery
//= require jsurlify

// This adds the events onto a form

// this module function is called with com.jivatechnology.Upper as 'this'
(function(){

  var scope = this;

  this.Form = (function(){

    var generateUploadID = function(){
      var uuid = "";
      for (i = 0; i < 32; i++) { uuid += Math.floor(Math.random() * 16).toString(16); }
      return uuid;
    };

    return function(settings){

      // Extract required info from settings
      var form_selector       = settings.form_selector;
      var accepted_extensions = settings.accepted_extensions;
      var onUpdate            = settings.onUpdate;

      var $form = jQuery(form_selector);
      var that = this;

      // Adds a randomly generated X-Progress-ID to the forms action
      // so that it can be tracked
      var setUploadID = function(){
        var id = generateUploadID();
        var action = new JSUrlify($form.attr('action'));
        action['X-Progress-ID'] = id;
        $form.attr('action', action);
        return id;
      };

      // Schedule reset of the file input
      // Done using setTimeout so that it is cleared after the form is submitted
      var clearFile = function(){
        window.setTimeout(function(){$form.find("input:first[type=file]").val("");},0);
      };

      // Checks that the file has the correct extension
      this.isValid = function(){
        if(accepted_extensions){
          var ext = that.file().extension().toLowerCase;
          return accepted_extensions.indexOf(ext) >= 0;
        } else {
          return true;
        }
      };

      // Turns the file input into a file object
      this.file = function(){
        var filename = $form.find("input:first[type=file]").val();
        return new scope.File(filename);
      };

      // Allows the target of the form to be set
      // Used to target the iframe, so that submitting the form does not
      // navigate the main window
      this.target = function(id){
        $form.attr("target",id);
      };

      // Add action to form submission
      $form.submit(function(){

        settings.upload_id = setUploadID();
        settings.form = that;

        // Store the state of the upload
        settings.result = new scope.Result({
          file:     that.file(),
          onUpdate: onUpdate
        });

        clearFile();

        // Check form is valid
        if(!that.isValid()){
          settings.result.errored();
          return false;
        }

        // Create poller to get progress
        var poller = new scope.Poller(settings);

        // Create iframe to post file through
        var iframe = new scope.IFrame(settings);

        settings.result.uploading();
      });

    };

  })();

}).call(com.jivatechnology.Upper);
