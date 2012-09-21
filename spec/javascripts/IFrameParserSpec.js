describe("IFrameParser", function() {

  var subject;
  var IFrameParser = com.jivatechnology.Upper.IFrameParser;

  var success  = '{"status":"success","data": [1,2,3]}';
  var failure  = '{"status":"fail","data": null}';
  var error    = '{"status":"error","message": "Too big","code": 9}';
  var nonsense = '<html><head></head><body><h1>HTML Error message</h1></body></html>';

  describe("constructor",function(){

    beforeEach(function() {
      subject = IFrameParser;
    });

    it("should accept the response", function(){
      var instance = new subject(success);

      expect(instance.response()).toEqual(success);
    });

  });

  describe("instance method", function(){

    beforeEach(function(){
      subject = IFrameParser;
    });

    describe("'status'", function(){
      it("should return 'success' when it's a success", function(){
        var i = new subject(success);
        expect(i.status()).toEqual('success');
      });

      it("should return 'fail' when it's a fail", function(){
        var i = new subject(failure);
        expect(i.status()).toEqual('fail');
      });

      it("should return 'error' when it's an error", function(){
        var i = new subject(error);
        expect(i.status()).toEqual('error');
      });

      it("should return 'error' when the response is nonsense", function(){
        var i = new subject(nonsense);
        expect(i.status()).toEqual('error');
      });
    });

    describe("'isSuccess'", function(){
      it("should return true if it's a success", function(){
        var i = new subject(success);

        expect(i.isSuccess()).toEqual(true);
      });

      it("should return false if it's a fail", function(){
        var i = new subject(failure);

        expect(i.isSuccess()).toEqual(false);
      });

      it("should return false if it's an error", function(){
        var i = new subject(error);

        expect(i.isSuccess()).toEqual(false);
      });

      it("should return false if it's nonsense", function(){
        var i = new subject(nonsense);

        expect(i.isSuccess()).toEqual(false);
      });
    });

    describe("'isFail'", function(){
      it("should return false if it's a success", function(){
        var i = new subject(success);

        expect(i.isFail()).toEqual(false);
      });

      it("should return true if it's a fail", function(){
        var i = new subject(failure);

        expect(i.isFail()).toEqual(true);
      });

      it("should return false if it's an error", function(){
        var i = new subject(error);

        expect(i.isFail()).toEqual(false);
      });

      it("should return false if it's nonsense", function(){
        var i = new subject(nonsense);

        expect(i.isFail()).toEqual(false);
      });
    });

    describe("'isError'", function(){
      it("should return false if it's a success", function(){
        var i = new subject(success);

        expect(i.isError()).toEqual(false);
      });

      it("should return false if it's a fail", function(){
        var i = new subject(failure);

        expect(i.isError()).toEqual(false);
      });

      it("should return true if it's an error", function(){
        var i = new subject(error);

        expect(i.isError()).toEqual(true);
      });

      it("should return true if it's nonsense", function(){
        var i = new subject(nonsense);

        expect(i.isError()).toEqual(true);
      });
    });

    describe("'message'", function(){
      it("should return message if available", function(){
        var i = new subject(error);

        expect(i.message()).toEqual("Too big");
      });

      it("should return null if not available", function(){
        var i = new subject(success);

        expect(i.message()).toBeNull(null);
      });

      it("should return text of HTML if not a valid response", function(){
        var i = new subject(nonsense);

        expect(i.message()).toEqual("HTML Error message");
      });

    });

    describe("'code'", function(){
      it("should return code if available", function(){
        var i = new subject(error);

        expect(i.code()).toEqual(9);
      });

      it("should return null if not available", function(){
        var i = new subject(success);

        expect(i.code()).toBeNull(null);
      });
    });

    describe("'data'", function(){
      it("should return data if available", function(){
        var i = new subject(success);

        expect(i.data()).toEqual([1,2,3]);
      });

      it("should return null if not available", function(){
        var i = new subject(error);

        expect(i.data()).toBeNull(null);
      });
    });

  });

});
