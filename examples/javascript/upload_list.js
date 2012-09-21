UploadList = (function(){

  // Constructor
  return function(destination){

    $destination = $(destination);

    var uploads = {};

    var uploadsFind = function(result){
      return uploads[result.id()];
    };

    var uploadsAdd = function(result){
      var element = createElement(result);
      var id      = result.id();
      var remove  = function(){ delete uploads[id]; $(element).remove(); };
      var upload  = new UploadListItem(element,result,remove);
      return uploads[id] = upload;
    };

    var createElement = function(result){
      var element = $("<li></li>");
      $destination.append(element);
      return element;
    };

    this.update = function(result){
      var upload = uploadsFind(result);
      if(upload){
        upload.update(result);
      } else {
        uploadsAdd(result);
      }

    };

  };

})();


UploadListItem = (function(){

  var extensions_images = ['jpg','jpeg','gif','png','bmp','jp2','tiff','tif','svg'];
  var extensions_audio  = ['mp3','ogg','wav','aac','aa3','aiff','flac','m4a','ape','wma','mp4','m4p'];

  // Constructor
  return function(destination,result,remove){

    var $destination = $(destination);
    var that = this;

    var render = function(){
      var markup =
      '<div class="upload-list-item-status upload-list-item-filetype icon ' + that.filetype() + '">' +
        that.status() +
        ' <i class="upload-list-item-name">' +
          that.name() +
        '</i> ' + (that.hasSize() ? '<span class="upload-list-item-size">('+that.size()+')</span>' : '') +
        '<span class="upload-list-item-cancel">Cancel</span>' +
      '</div>';

      if(that.state() == "errored"){
        markup +=
        '<div class="upload-list-item-message">'+that.errorMessage()+'</div>';
      } else {
        markup +=
        '<div class="upload-list-item-progress"> ' +
          '<span class="upload-list-item-progress-bar"></span> ' +
          '<span class="upload-list-item-value">' +
            that.progress() +
          '</span> ' +
        '</div>';
      }


      var $element = $(markup);
      $destination.html($element);
      $element.parent().attr("class","upload-list-item upload-list-item-"+that.state());
      $element.find('.upload-list-item-cancel').click(that.cancel);
      $element.find('.upload-list-item-progress-bar').css("width",that.progress());
    };

    this.filetype = function(){
      var ext = result.file().extension().toLowerCase();
      var type;
      if(extensions_audio.indexOf(ext) >= 0){
        type = "icon-audio";
      } else if (extensions_images.indexOf(ext) >= 0){
        type = "icon-image";
      } else {
        type = "icon-file";
      }
      return type;
    };

    this.status = function(){
      var status;
      switch(result.state()){
        case "started":
          status = "Uploading&hellip;";
          break;
        case "uploaded":
          status = "Processing&hellip;";
          break;
        case "completed":
          status = "Completed";
          break;
        case "errored":
          status = "Error uploading";
          break;
        default:
          status = "";
      }
      return status;
    };

    this.state = function(){
      return result.state();
    };

    this.name = function(){
      return result.file().name();
    };

    this.size = function(){
      return result.humanSizeTotal();
    };

    this.hasSize = function(){
      return !!result.sizeTotal();
    };

    this.progress = function(){
      return result.humanProgress();
    };

    this.canCancel = function(){
      return result.canCancel();
    };

    this.cancel = function(){
      // Download can only be cancelled while it is uploading
      if(result.canCancel()){ result.cancelled(); }
      // Clicking the cross will remove it from the list in either case
      remove();
    };

    this.errorMessage = function(){
      return result.errorMessage();
    };

    this.update = function(r){
      result = r;
      render();
    };

    this.element = function(){
      return $destination;
    };

    render();

  };

})();
