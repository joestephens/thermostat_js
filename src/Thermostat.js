'use strict'

function Thermostat(temperature){
  this.MINIMUM_TEMP = 10;
  this.DEFAULT_TEMP = 20;
  this.MAXIMUM_TEMP_PS_OFF = 32;
  this.MAXIMUM_TEMP_PS_ON = 25;
  this.LOW_USAGE = 18;
  this.HIGH_USAGE = 25;

  this.temperature = typeof temperature === 'undefined' ? this.DEFAULT_TEMP : temperature;
  this.powerSavingMode = true;
  this.maximumTemp = this.MAXIMUM_TEMP_PS_ON;
};

Thermostat.prototype = {
  increase: function() {
      if (this._atMaximumLimit()) {
      throw new Error('Can\'t increase above ' + this.maximumTemp + ' degrees')
    }
    this.temperature += 1;
  },

  decrease: function() {
    if (this._atMinimumLimit()) {
      throw new Error('Can\'t decrease below ' + this.MINIMUM_TEMP + ' degrees')
    }
    this.temperature -= 1;
  },

  _atMinimumLimit: function() {
    return ((this.temperature) <= this.MINIMUM_TEMP);
  },

  _atMaximumLimit: function() {
    return ((this.temperature) >= this.maximumTemp);
  },

  powerSavingSwitch: function() {
    if (this.powerSavingMode) {
      this.powerSavingMode = false;
      this.maximumTemp = this.MAXIMUM_TEMP_PS_OFF
    } else {
      this.powerSavingMode = true;
      this.maximumTemp = this.MAXIMUM_TEMP_PS_ON
    }
  },

  reset: function() {
    this.temperature = this.DEFAULT_TEMP;
  },

  displayUsage: function() {
    if(this.temperature < this.LOW_USAGE) {
      return 'low-usage';
    } else if(this.temperature >= this.HIGH_USAGE) {
      return 'high-usage';
    } else {
      return 'medium-usage';
    }
  },

  powerSavingOnOff: function() {
    return this.powerSavingMode ? 'on' : 'off';
  },

  powerSavingNotOnOff: function() {
    return this.powerSavingMode ? 'off' : 'on';
  }
};
