// this module function is called with com.jivatechnology.Upper as 'this'
(function(){

  this.File = (function(){

    // Return the constructor
    return function(filename){

      var that = this;

      // The filename, path + name
      this.filename = function(){
        return filename;
      };

      var pathMatcher = /^(.*)[\/\\]([^\/\\]+)$/;
      // Just the path
      this.path = function(){
        var name = that.filename();
        var result = pathMatcher.exec(name);
        return result ? result[1] : "";
      };

      // Just the name of the file
      this.name = function(){
        var name = that.filename();
        var result = pathMatcher.exec(name);
        return result ? result[2] : "";
      };

      var nameMatcher = /^(.*)\.([^\.]*)$/;
      // Just the name of the file without the extension
      this.basename = function(){
        var name    = that.name();
        var result  = nameMatcher.exec(name);
        return result ? result[1] : name;
      };

      // Just the extension of the file
      this.extension = function(){
        var name    = that.name();
        var result  = nameMatcher.exec(name);
        return result ? result[2] : "";
      };

    };

  })();

}).call(com.jivatechnology.Upper);
