(function () {
  String.prototype.lpad = function (pad, len) {
    while (pad.length < len) {
      pad += pad;
    }
    return pad.substr(0, len - this.length) + this;
  };
  
  function loadSelect(selector, maxValue) {
    for(i = 0; i <= maxValue; i++) {
      $(selector).append('<option value="' + i + '">' + i + '</option>');
    }
  }

  function createLayout() {
    $('#quickbar_contents').append('<div id="alert_script"></div>');
    $('#alert_script').append('<div id="alert_script_clock"></div>');
    $('#alert_script').append('<div id="alert_script_form"></div>');
    $('#alert_script_form').append('<select id="alert_script_hour"></select> óra ');
    $('#alert_script_form').append('<select id="alert_script_min"></select> perc ');
    $('#alert_script_form').append('<select id="alert_script_sec"></select> másodperc');
    $('#alert_script_form').append('<br />');
    $('#alert_script_form').append('A riasztás szövege<br />');
    $('#alert_script_form').append('<input type="text" id="alert_script_text" size="60" />');
    $('#alert_script_form').append('<br />');
    $('#alert_script_form').append('<button id="alert_script_btn_set">Beállítás</button> ');
    $('#alert_script_form').append('<button id="alert_script_btn_clear" disabled="disabled">Törlés</button>');
    
    loadSelect('#alert_script_hour', 23);
    loadSelect('#alert_script_min', 59);
    loadSelect('#alert_script_sec', 59);
    
    $('#alert_script_btn_set').on('click', function() {
      var interval = startTimer();
      
      $('#alert_script_btn_clear').on('click', function() {
        clearInterval(interval);
        setStartActiveAndClearInactive(false);
        
        $('#alert_script_btn_clear').off('click');
      });
      
      setStartActiveAndClearInactive(true);
    });
  }
  
  function setStartActiveAndClearInactive(enabled) {
    $('#alert_script_btn_set').prop('disabled', enabled);
    $('#alert_script_btn_clear').prop('disabled', !enabled);
  }
  
  function startClock() {
    return setInterval(function () {
      var currentDate = new Date();
      var str = currentDate.getHours().toString().lpad('0', 2) + ':'
              + currentDate.getMinutes().toString().lpad('0', 2) + ':'
              + currentDate.getSeconds().toString().lpad('0', 2);
      
      $('#alert_script_clock').text(str);
    }, 1000);
  }
  
  function startTimer() {
    var interval = setInterval(function() {
      var currentDate = new Date();
      var hours = $('#alert_script_hour').val();
      var minutes = $('#alert_script_min').val();
      var seconds = $('#alert_script_sec').val();
       
      if(currentDate.getHours() == hours && currentDate.getMinutes() == minutes && currentDate.getSeconds() == seconds) {
        alert($('#alert_script_text').val());
        clearInterval(interval);
        setStartActiveAndClearInactive(false);
      }
    }, 1000);
    
    return interval;
  }
  
  (function() {
    createLayout();
    startClock();
  })();
}) ();
