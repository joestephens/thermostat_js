$(document).ready(function(){
  var thermostat = new Thermostat();
  updateTemperature();
  updatePowerSavingMode();
  loadWeather('London');

  $('#city-chooser').hide();

  function loadWeather(city) {
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + ',uk&appid=b241ed97abb83074ef441ef8fd97adc3&units=metric', function(data) {
      $('#current-temperature').text(Math.floor(data.main.temp));
      $('#city').text(data.name.toLowerCase());
    });
  };

  $('#temperature-increase').click(function() {
    thermostat.increase();
    updateTemperature();
  });

  $('#temperature-decrease').click(function() {
    thermostat.decrease();
    updateTemperature();
  });

  $('#temperature-reset').click(function() {
    thermostat.reset();
    updateTemperature();
  });

  $('#power-saving-switch').click(function() {
    thermostat.powerSavingSwitch();
    updatePowerSavingMode();
    updateTemperature();
  });

  $('#change-city').click(function() {
    $(this).hide();
    $('#city-chooser').show();
    $('#city-chooser').focus();
  });

  $('#city-chooser').focus(function() {
    $(document).keypress(function(e) {
      if(e.which === 13) {
        $('#change-city').click
      };
    });
  });

  $('#city-chooser').focusout(function() {
    showChangeCity();
  });

  $('#change-city-form').submit(function() {
    loadWeather($('#city-chooser').val());
    showChangeCity();
    event.preventDefault();
  });

  function showChangeCity() {
    $('#change-city').show();
    $('#city-chooser').hide();
    $('#city-chooser').val('');
  };

  function updateTemperature() {
    $('#temperature').text(thermostat.temperature);
    $('#temperature').attr('class', thermostat.displayUsage());
  };

  function updatePowerSavingMode() {
    $('#power-saving-mode').text(thermostat.powerSavingOnOff());
    $('#power-saving-switch').text('turn ' + thermostat.powerSavingNotOnOff());
  };

});
