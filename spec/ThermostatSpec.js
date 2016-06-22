'use strict';

describe('Thermostat', function(){

  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it('thermostat is created with a temperature of 20 degrees', function(){
    expect(thermostat.temperature).toEqual(thermostat.DEFAULT_TEMP);
  });

  it('thermostat is created with power saving mode set to ON', function(){
    expect(thermostat.powerSavingMode).toBeTruthy();
  });

  it('increases temperature', function(){
    thermostat.increase();
    expect(thermostat.temperature).toEqual(21);
  });

  it('decreases temperature', function(){
    thermostat.decrease();
    expect(thermostat.temperature).toEqual(19);
  });

  it('has a minimum temperature', function(){
    for(var i = 0; i < thermostat.MINIMUM_TEMP; i++) {
      thermostat.decrease();
    };
    expect(function(){thermostat.decrease()}).toThrowError('Can\'t decrease below ' + thermostat.MINIMUM_TEMP + ' degrees');
  });

  it('has a maximum temperature when power saving mode on', function(){
    for(var i = thermostat.temperature; i < thermostat.maximumTemp; i++) {
      thermostat.increase();
    };
    expect(function(){thermostat.increase()}).toThrowError('Can\'t increase above ' + thermostat.maximumTemp + ' degrees')
  });

});
