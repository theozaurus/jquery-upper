//= require jquery
//= require ./iframe_parser

// This is where the file upload takes place

// this module function is called with com.jivatechnology.Upper as 'this'
(function(){

  var scope = this;

  this.IFrame = (function(){

    var i = 0;

    var generateID = function(){
      return "upper-iframe-" + i ++;
    };

    var createIFrame = function(form){
      var frame_id = generateID();
      var html = "<iframe id='"+frame_id+"' name='"+frame_id+"' width='0' height='0' frameborder='0' border='0' src='about:blank' style='display:none;'></iframe>";
      $('body').append(html);
      return $('#' + frame_id);
    };

    // Return the constructor
    return function(settings){

      // Extract required info from settings
      var result = settings.result;
      var form   = settings.form;

      // Create a new iframe on the page
      var $iframe = createIFrame(form);

      // Update the form to target the iframe
      form.target($iframe.attr('id'));

      // Add callback when iframe loads to update result
      $iframe.load(function(){
        var body = $iframe.contents().find("body").text();
        var iframe_result = new scope.IFrameParser(body);
        if(iframe_result.isSuccess()){
          result.completed(iframe_result.data());
        } else {
          result.errored(iframe_result.message());
        }
      });

      // Add result callbacks to tidy up iframe
      result.onUpdate.add(function(r){
        if(r.hasEnded()){ $iframe.remove(); }
      });

    };


  })();

}).call(com.jivatechnology.Upper);
