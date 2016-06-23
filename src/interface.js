$(document).ready(function(){
  var thermostat = new Thermostat();
  updateTemperature();
  updatePowerSavingMode();

  $.get('http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=b241ed97abb83074ef441ef8fd97adc3&units=metric', function(data) {
    //var cityTemp = data.main.temp.floor();
    $('#current-temperature').text(Math.floor(data.main.temp));
    $('#city').text(data.name.toLowerCase());
  });

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

  function updateTemperature() {
    $('#temperature').text(thermostat.temperature);
    $('#temperature').attr('class', thermostat.displayUsage());
  };

  function updatePowerSavingMode() {
    $('#power-saving-mode').text(thermostat.powerSavingOnOff());
    $('#power-saving-switch').text('turn ' + thermostat.powerSavingNotOnOff());
  };

});
