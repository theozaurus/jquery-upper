describe("Result", function() {

  var subject;
  var Result = com.jivatechnology.Upper.Result;

  describe("constructor",function(){

    beforeEach(function() {
      subject = Result;
    });

    it("should automatically store creation time", function(){
      var instance = new subject();
      var result = instance.createdAt();
      expect(result).toBeNearEnough(new Date());
    });

    it("with total size option", function(){
      expect(subject).toTakeIntegerOptionFor('sizeTotal');
      expect(subject).toHaveDefaultFor('sizeTotal',0);
    });

    it("should store size uploaded", function(){
      expect(subject).toTakeIntegerOptionFor('sizeUploaded');
      expect(subject).toHaveDefaultFor('sizeUploaded',0);
    });

    it("should store state", function(){
      expect(subject).toTakeStringOptionFor('state');
      expect(subject).toHaveDefaultFor('state','started');
    });

  });

  describe("instance method",function(){

    beforeEach(function(){
      subject = new Result();
    });

    describe("'progress'", function(){
      it("should be readonly", function(){
        expect(subject).toBeReadOnlyFor('progress');
      });

      it("should be based correctly on sizeTotal and sizeUploaded", function(){
        subject.sizeTotal(1000);
        subject.sizeUploaded(10);

        expect(subject.progress()).toEqual(0.01);

        subject.sizeUploaded(100);

        expect(subject.progress()).toEqual(0.1);

        subject.sizeUploaded(1000);

        expect(subject.progress()).toEqual(1.0);

        subject.sizeUploaded(1100);

        expect(subject.progress()).toEqual(1.0);

        subject.sizeUploaded(-123);

        expect(subject.progress()).toEqual(0);
      });
    });

    describe("'humanProgress'", function(){
      it("should be rounded to 0 decimal places", function(){
        subject.sizeTotal(1000);
        subject.sizeUploaded(0);

        expect(subject.humanProgress()).toEqual("0%");

        subject.sizeUploaded(104);

        expect(subject.humanProgress()).toEqual("10%");

        subject.sizeUploaded(995);

        expect(subject.humanProgress()).toEqual("100%");
      });
    });

    describe("'sizeTotal'", function(){
      it("should act as getter and setter", function(){
        expect(subject.sizeTotal(1233)).toEqual(1233);
        expect(subject.sizeTotal()).toEqual(1233);
      });
    });

    describe("'humanSizeTotal", function(){
      it("should deal with small numbers", function(){
        subject.sizeTotal(103);

        expect(subject.humanSizeTotal()).toEqual("103 B");
      });

      it("should deal with medium sized numbers", function(){
        subject.sizeTotal(10323);

        expect(subject.humanSizeTotal()).toEqual("10.08 KB");
      });

      it("should deal with massive numbers", function(){
        subject.sizeTotal(10000000000000000);

        expect(subject.humanSizeTotal()).toEqual("9094.95 TB");
      });
    });

    describe("'sizeUploaded'", function(){
      it("should act as getter and setter", function(){
        expect(subject.sizeUploaded(1233)).toEqual(1233);
        expect(subject.sizeUploaded()).toEqual(1233);
      });
    });

    describe("'humanSizeUploaded", function(){
      it("should deal with small numbers", function(){
        subject.sizeUploaded(103);

        expect(subject.humanSizeUploaded()).toEqual("103 B");
      });

      it("should deal with medium sized numbers", function(){
        subject.sizeUploaded(10323);

        expect(subject.humanSizeUploaded()).toEqual("10.08 KB");
      });

      it("should deal with massive numbers", function(){
        subject.sizeUploaded(10000000000000000);

        expect(subject.humanSizeUploaded()).toEqual("9094.95 TB");
      });
    });

    describe("'file'", function(){
      it("should return a File object", function(){
        var result = subject.file("foo/bar/baz.txt");
        expect(result.constructor).toBe(com.jivatechnology.Upper.File);

        result = subject.file();
        expect(result.constructor).toBe(com.jivatechnology.Upper.File);

        expect(result.filename()).toEqual("foo/bar/baz.txt");
      });
    });

    describe("'state'", function(){

    });

  });

});
