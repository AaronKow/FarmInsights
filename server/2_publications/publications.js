Meteor.publish('forecastData', function(){
	if(this.userId){
		return Forecast.find({'owner_id': this.userId}, {fields: {'owner_id': false}});
	}
});

Meteor.publish('hourForecastData', function(){
	if(this.userId){
		return HourForecast.find({'owner_id': this.userId}, {fields: {'owner_id': false}});
	}
});

Meteor.publish('temperaturePatternData', function(){
	if(this.userId){
		return TemperaturePattern.find({'owner_id': this.userId}, {fields: {'owner_id': false}});
	}
});