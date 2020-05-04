javascript:
      setInterval(function(){
            var time = $("#serverTime")[0].innerHTML.match(/^\d+\:\d+\:\d+/),
                ms = (new Date().getMilliseconds()).toString();
            while(ms.length < 3) {
                  ms = "0" + ms;
            }
            $("#serverTime").text(time + ":" + ms);
      }, 1);
void(0);