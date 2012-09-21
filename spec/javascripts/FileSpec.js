describe("File", function() {

  var subject;
  var File = com.jivatechnology.Upper.File;

  describe("constructor",function(){

    beforeEach(function() {
      subject = File;
    });

    it("should accept a filename", function(){
      var instance = new subject('C:\\fakepath\\baz.txt');

      expect(instance.filename()).toEqual('C:\\fakepath\\baz.txt');
    });

  });

  describe("instance method", function(){

    beforeEach(function(){
      subject = File;
    });

    describe("'filename'", function(){
      it("should return correct value", function(){
        var i = new subject('C:\\fakepath\\baz.txt');

        expect(i.filename()).toEqual('C:\\fakepath\\baz.txt');
      });
    });

    describe("'path'", function(){
      it("should return correct value", function(){
        var i = new subject('C:\\fakepath\\baz.txt');

        expect(i.path()).toEqual('C:\\fakepath');
      });
    });

    describe("'name'", function(){
      it("should return correct value", function(){
        var i = new subject('C:\\fakepath\\baz.txt');

        expect(i.name()).toEqual("baz.txt");
      });
    });

    describe("'basename'", function(){
      it("should return correct value", function(){
        var i = new subject('C:\\fakepath\\baz.txt');
        expect(i.basename()).toEqual("baz");

        i = new subject("a/b/c/file");
        expect(i.basename()).toEqual("file");

        i = new subject("a/b/c/file.v1.jpg");
        expect(i.basename()).toEqual("file.v1");
      });
    });

    describe("'extension'", function(){
      it("should return correct value", function(){
        var i = new subject('C:\\fakepath\\baz.txt');
        expect(i.extension()).toEqual("txt");

        i = new subject("a/b/c/file");
        expect(i.extension()).toEqual("");

        i = new subject("a/b/c/file.v1.jpg");
        expect(i.extension()).toEqual("jpg");
      });
    });

  });

});
