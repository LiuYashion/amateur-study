!function(c,e,i){
  "use strict";

  "function" == typeof window.define && window.define.amd ?
    window.define(i) :
    "undefined" != typeof module && module.exports ?
      module.exports=i() :
      e.exports ?
        e.exports=i() :
        e.Jxfd=i()

      }(0, this, function(){
        "use strict";

        var e = function(c){
          if(!(this instanceof e))
          return new e
        };

        return e.prototype = {
          phones: function(c){
            this.phonescallbackfun=c,
            this.invokeUniWebView("phones","callback="+c)
          },
          phonescallback:function(c){
            try{
              this.phonescallbackfun(c)
            }catch(c){
              alert(c.message)
            }
          },
          callrecord:function(c){
            this.callrecordcallbackfun=c,
            this.invokeUniWebView("callrecord","callback="+c)
          },
          callrecordcallback:function(c){
            try{
              this.callrecordcallbackfun(c)
            }catch(c){
              alert(c.message)
            }
          },
          cgps:function(c){
            this.cgpscallbackfun=c,
            this.invokeUniWebView("cgps","callback="+c)
          },
          cgpscallback:function(c){
            try{
              this.cgpscallbackfun(c)
            }catch(c){
              alert(c.message)
            }
          },
          applist:function(c){
            this.applistcallbackfun=c,
            this.invokeUniWebView("applist","callback="+c)
          },
          applistcallback:function(c){
            try{
              this.applistcallbackfun(c)
            }catch(c){
              alert(c.message)
            }
          },

          ocr:function(c){
            this.ocrcallbackfun=c,
            this.invokeUniWebView("ocr","callback="+c)
          },
          ocrcallback:function(c){
            try{
              this.ocrcallbackfun(c)
            }catch(c){
              alert(c.message)
            }
          },

          taskFinish:function(c){
            this.invokeUniWebView("taskFinish","taskType="+c.taskType)
          },
          browser:function(c){
            this.invokeUniWebView("browser","url="+encodeURIComponent(c.url))
          },
          navBar:function(c){
            this.invokeUniWebView("navBar","navId="+c.navId)
          },
          close:function(){
            this.invokeUniWebView("close")
          },

          device:function(c){
            this.devicecallbackfun=c,
            this.invokeUniWebView("device","callback="+c)
          },
          devicecallback:function(c){
            try{
              this.devicecallbackfun(c)
            }catch(c){
              alert(c.message)
            }
          },



          face:function(c){
            this.facecallbackfun=c,
            this.invokeUniWebView("face","callback="+c)
          },
          facecallback:function(data){
            try{
              this.facecallbackfun(data)
            }catch(c){
              alert(c.message)
            }
          },

          invokeUniWebView:function(c,e){
            // ("device", "callback="+c)
            try{
              window.location.href="uniwebview://"+c+(e?"?"+e:"")

              // uniwebview://face?callback=function(t){
              // ....
              // }

            }catch(c){
              alert("error:"+c.message)
            }
          }

        },e}), window.jxfd=new Jxfd;
