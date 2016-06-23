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

  it('power saving mode can be on', function() {
    expect(thermostat.powerSavingOnOff()).toEqual('on');
  });

  it('power saving mode can be off', function() {
    thermostat.powerSavingSwitch();
    expect(thermostat.powerSavingOnOff()).toEqual('off');
  });

  it('opposite to power saving mode on', function() {
    expect(thermostat.powerSavingNotOnOff()).toEqual('off');
  });

  it('opposite to power saving mode off', function() {
    thermostat.powerSavingSwitch();
    expect(thermostat.powerSavingNotOnOff()).toEqual('on');
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

  it('has a different maximum temperature when power saving mode off', function(){
    thermostat.powerSavingSwitch();
    for(var i = thermostat.temperature; i < thermostat.maximumTemp; i++) {
      thermostat.increase();
    };
    expect(function(){thermostat.increase()}).toThrowError('Can\'t increase above ' + thermostat.maximumTemp + ' degrees')
  });

  it('temperature can be reset', function(){
    for(var i = 0; i < 3; i++) {
      thermostat.increase();
    }
    thermostat.reset();
    expect(thermostat.temperature).toEqual(thermostat.DEFAULT_TEMP);
  });

  describe('Usage', function(){
    describe('displays the temperature', function(){
      it('in green when energy usage low', function(){
        for(var i = 0; i < 3; i++) {
          thermostat.decrease();
        }
        expect(thermostat.displayUsage()).toEqual('low-usage');
      });

      it('in yellow when energy usage average', function(){
        expect(thermostat.displayUsage()).toEqual('medium-usage');
      });

      it('in red when energy usage high', function(){
        for(var i = 0; i < 5; i++) {
          thermostat.increase();
        }
        expect(thermostat.displayUsage()).toEqual('high-usage');
      });

    });
  });

});
