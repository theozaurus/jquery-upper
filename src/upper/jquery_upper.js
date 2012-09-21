//= require jquery

(function( $ ) {

  var scope = com.jivatechnology.Upper;

  var defaults = {
    interval: 2000,
    progress_url: "/progress",
    accepted_extensions: null
  };

  $.fn.upper = function(settings){

    return this.each(function(){

      // Setup default settings
      settings = jQuery.extend(defaults, settings);
      settings.form_selector = this;
      new scope.Form(settings);

    });

  };

})( jQuery );
