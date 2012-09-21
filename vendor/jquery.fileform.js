//= jquery

// Designed to turn forms with a single file field into a single button that
// auto submits the form as soon as it is clicked

(function( $ ) {

  var i = 0;
  var generateButtonID = function(){
    return "fileform-" + i ++;
  };

  var buildButton = function($form,text,classes){
    // Create button if it doesn't exist
    var id = generateButtonID();
    var markup = "<a href='javascript:void(0)' id='"+id+"' class='"+classes+"'>"+text+"</a>";
    $form.before(markup);
    return $('#' + id);
  };

  var positionForm = function($form,$input,$button){
    // Position form absolutely over top of button
    $form.css('display', 'block');
    $form.css('position', 'absolute');
    $form.css('overflow', 'hidden');
    $form.css('margin', 0);
    $form.css('padding', 0);
    $form.css('opacity', 0);
    // Make sure browse button is in the right side
    // in Internet Explorer
    $form.css('direction', 'ltr');
    //Max zIndex supported by Opera 9.0-9.2
    $form.css('zIndex', 2147483583);

    var button_position = $button.position();
    $form.css('left',   button_position.left + "px");
    $form.css('top',    button_position.top  + "px");
    $form.css('width',  $button.outerWidth()  + "px");
    $form.css('height', $button.outerHeight() + "px");

    // Add events to form to simulate hover and active for button
    $form.hover(function(){ $button.addClass('hover');},function(){$button.removeClass('hover');});
    $form.mousedown(function(){ $button.addClass('active');});
    $form.mouseup(function(){ $button.removeClass('active');});

    // Make input massive so it fills form
    $input.css('position', 'absolute');
    $input.css('right', 0);
    $input.css('margin', 0);
    $input.css('padding', 0);
    $input.css('font-size', '480px');
    $input.css('cursor', 'pointer');
  };

  var defaults = {
    text:    "Upload file",
    classes: "button"
  };

  $.fn.fileform = function(settings){

    return this.each(function(){

      // Setup default settings
      settings = jQuery.extend(defaults, settings);

      var $form = $(this);
      var $input = $form.find("input:first[type=file]");
      var $button = buildButton($form,settings.text,settings.classes);

      // Put button over the top of the form
      positionForm($form,$input,$button);

      // Clicking button will open file dialog
      $button.click(function(){ $input.click();});

      // When file input changes submit form
      $input.change(function(){ if(this.value.length > 0){ $form.submit(); } });

    });

  };

})( jQuery );
