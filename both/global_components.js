if(Meteor.isClient){

	renderHourForecast = function(){
		/* Dataset Configuration for hour forecast data */
		var hourForecastData = HourForecast.findOne({});
        var arrayData = [];
        for (var i=0; i<hourForecastData.forecast_data.length; i++){
            var d = new Date(hourForecastData.forecast_data[i].forecastTime);

            arrayData.push({
            	'timestamp': d.getTime(),
            	'precipitation': hourForecastData.forecast_data[i].precipitation,
            	'windSpd': hourForecastData.forecast_data[i].windSpeed,
            	'temperature': hourForecastData.forecast_data[i].temperature
            });
        }

        Morris.Area({
			resize: true,
			hideHover: true,
			element: 'lineChartForecast',
			data: arrayData,
			xkey: 'timestamp',
			ykeys: ['precipitation', 'windSpd', 'temperature'],
			labels: ['Precipitation (÷100 mm/hr)', 'Wind Speed (÷10 m/s)', 'Temperature (°C)']
		});


	};

	// display 48-hours temperature pattern in dashboard
	renderTemperaturePatten = function(){
		/* Dataset Configuration for temperature pattern data */
	    var tempPatternData = TemperaturePattern.findOne({});
	    var arrayTempPattern = [];
	    for (var j=0; j<tempPatternData.temperature_pattern.length; j++){
	        arrayTempPattern.push(tempPatternData.temperature_pattern[j].temperature);
	    }

		/* Flot-line-chart-moving configuration for temperature pattern */
		var container = $("#flot-line-chart-moving");
	    // Determine how many data points to keep based on the placeholder's initial size;
	    // this gives us a nice high-res plot while avoiding more than one point per pixel.
	    var maximum = tempPatternData.temperature_pattern.length;
	    var data = arrayTempPattern;
	    function getDataRealTime() {
	        if (data.length) {
	            data.push(data[0]);
	            data = data.slice(1); // this eliminate first data and allow next data to come in
	        }
	        var res = [];
	        for (var i = 0; i < data.length; ++i) {
	            res.push([i, data[i]]);
	        }
	        return res;
	    }

	    series = [{
	        data: getDataRealTime(),
	        lines: {
	            fill: true
	        }
	    }];


	    var plot = $.plot(container, series, {
	        grid: {

	            color: "#999999",
	            tickColor: "#D4D4D4",
	            borderWidth:0,
	            minBorderMargin: 20,
	            labelMargin: 10,
	            backgroundColor: {
	                colors: ["#ffffff", "#ffffff"]
	            },
	            margin: {
	                top: 8,
	                bottom: 20,
	                left: 20
	            },
	            markings: function(axes) {
	                var markings = [];
	                var xaxis = axes.xaxis;
	                for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
	                    markings.push({
	                        xaxis: {
	                            from: x,
	                            to: x + xaxis.tickSize
	                        },
	                        color: "#fff"
	                    });
	                }
	                return markings;
	            }
	        },
	        colors: ["#B2E0FF"],
	        xaxis: {
	            tickFormatter: function() {
	                return "";
	            }
	        },
	        yaxis: {
	            min: 0,
	            max: 50
	        },
	        legend: {
	            show: true
	        }
	    });

	    setInterval(function updateRandom() {
	        series[0].data = getDataRealTime();
	        plot.setData(series);
	        plot.draw();
	    }, 120);
	};

	// below functions used for jquery-step wizard: step1Func, step2Func, cancelFunc
	step1Func = function(form, group){
		form.steps('remove', 1);
		form.steps("insert", 1, {
			title: "Commodity",
			content: function(){
				if(group === 'fruit'){
					return '<div class="container-fluid"><div class="row"><a href="#" class="col-xs-3 stepBorder appleBtn"><img src="/icons/commodity/apple.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Apple</h3><h4 class="text-center stepText visible-md">Apple</h4><p class="text-center stepText visible-sm visible-xs">Apple</p></a><a href="#" class="col-xs-3 stepBorder avocadoBtn"><img src="/icons/commodity/avocado.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Avocado</h3><h4 class="text-center stepText visible-md">Avocado</h4><p class="text-center stepText visible-sm visible-xs">Avocado</p></a><a href="#" class="col-xs-3 stepBorder bananaBtn"><img src="/icons/commodity/banana.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Banana</h3><h4 class="text-center stepText visible-md">Banana</h4><p class="text-center stepText visible-sm visible-xs">Banana</p></a><a href="#" class="col-xs-3 stepBorder coffeeBtn"><img src="/icons/commodity/coffee.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Coffee</h3><h4 class="text-center stepText visible-md">Coffee</h4><p class="text-center stepText visible-sm visible-xs">Coffee</p></a><a href="#" class="col-xs-3 stepBorder lemonBtn"><img src="/icons/commodity/lemon.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Lemon</h3><h4 class="text-center stepText visible-md">Lemon</h4><p class="text-center stepText visible-sm visible-xs">Lemon</p></a><a href="#" class="col-xs-3 stepBorder pearBtn"><img src="/icons/commodity/pear.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Pear</h3><h4 class="text-center stepText visible-md">Pear</h4><p class="text-center stepText visible-sm visible-xs">Pear</p></a><a href="#" class="col-xs-3 stepBorder strawberryBtn"><img src="/icons/commodity/strawberry.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Strawberry</h3><h4 class="text-center stepText visible-md">Strawberry</h4><p class="text-center stepText visible-sm visible-xs">Strawberry</p></a></div></div><div class="col-xs-12"><div>*All Icons are made by <a href="http://www.freepik.com" target="_blank" title="Freepik">Freepik</a> from <a target="_blank" href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a target="_blank" href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a></div></div>';
				}
				else if(group === 'crop'){
					return '<div class="container-fluid"><div class="row"><a href="#" class="col-xs-3 stepBorder barleyBtn"><img src="/icons/commodity/barley.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Barley</h3><h4 class="text-center stepText visible-md">Barley</h4><p class="text-center stepText visible-sm visible-xs">Barley</p></a><a href="#" class="col-xs-3 stepBorder cornBtn"><img src="/icons/commodity/corn.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Corn</h3><h4 class="text-center stepText visible-md">Corn</h4><p class="text-center stepText visible-sm visible-xs">Corn</p></a><a href="#" class="col-xs-3 stepBorder herbBtn"><img src="/icons/commodity/herb.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Herb</h3><h4 class="text-center stepText visible-md">Herb</h4><p class="text-center stepText visible-sm visible-xs">Herb</p></a><a href="#" class="col-xs-3 stepBorder peasBtn"><img src="/icons/commodity/peas.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Peas</h3><h4 class="text-center stepText visible-md">Peas</h4><p class="text-center stepText visible-sm visible-xs">Peas</p></a><a href="#" class="col-xs-3 stepBorder soybeanBtn"><img src="/icons/commodity/soybean.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Soybean</h3><h4 class="text-center stepText visible-md">Soybean</h4><p class="text-center stepText visible-sm visible-xs">Soybean</p></a><a href="#" class="col-xs-3 stepBorder sunflowerBtn"><img src="/icons/commodity/sunflower.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Sunflower</h3><h4 class="text-center stepText visible-md">Sunflower</h4><p class="text-center stepText visible-sm visible-xs">Sunflower</p></a><a href="#" class="col-xs-3 stepBorder wheatBtn"><img src="/icons/commodity/wheat.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Wheat</h3><h4 class="text-center stepText visible-md">Wheat</h4><p class="text-center stepText visible-sm visible-xs">Wheat</p></a><div class="col-xs-12"><div>*All Icons are made by <a href="http://www.freepik.com" target="_blank" title="Freepik">Freepik</a> from <a target="_blank" href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a target="_blank" href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a></div></div></div></div>';
				}
				else if (group === 'vege'){
					return '<div class="container-fluid"><div class="row"><a href="#" class="col-xs-3 stepBorder artichokeBtn"><img src="/icons/commodity/artichoke.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Artichoke</h3><h4 class="text-center stepText visible-md">Artichoke</h4><p class="text-center stepText visible-sm visible-xs">Artichoke</p></a><a href="#" class="col-xs-3 stepBorder broccoliBtn"><img src="/icons/commodity/broccoli.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Broccoli</h3><h4 class="text-center stepText visible-md">Broccoli</h4><p class="text-center stepText visible-sm visible-xs">Broccoli</p></a><a href="#" class="col-xs-3 stepBorder carrotBtn"><img src="/icons/commodity/carrot.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Carrot</h3><h4 class="text-center stepText visible-md">Carrot</h4><p class="text-center stepText visible-sm visible-xs">Carrot</p></a><a href="#" class="col-xs-3 stepBorder eggplantBtn"><img src="/icons/commodity/eggplant.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Eggplant</h3><h4 class="text-center stepText visible-md">Eggplant</h4><p class="text-center stepText visible-sm visible-xs">Eggplant</p></a><a href="#" class="col-xs-3 stepBorder garlicBtn"><img src="/icons/commodity/garlic.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Garlic</h3><h4 class="text-center stepText visible-md">Garlic</h4><p class="text-center stepText visible-sm visible-xs">Garlic</p></a><a href="#" class="col-xs-3 stepBorder onionBtn"><img src="/icons/commodity/onion.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Onion</h3><h4 class="text-center stepText visible-md">Onion</h4><p class="text-center stepText visible-sm visible-xs">Onion</p></a><a href="#" class="col-xs-3 stepBorder potatoBtn"><img src="/icons/commodity/potato.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Potato</h3><h4 class="text-center stepText visible-md">Potato</h4><p class="text-center stepText visible-sm visible-xs">Potato</p></a><a href="#" class="col-xs-3 stepBorder tomatoBtn"><img src="/icons/commodity/tomato.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Tomato</h3><h4 class="text-center stepText visible-md">Tomato</h4><p class="text-center stepText visible-sm visible-xs">Tomato</p></a></div></div><div class="col-xs-12"><div>*All Icons are made by <a href="http://www.freepik.com" target="_blank" title="Freepik">Freepik</a> from <a target="_blank" href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a target="_blank" href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a></div></div></div></div>';
				}
				else if(group === 'dairy'){
					return '<div class="container-fluid"><div class="row"><a href="#" class="col-xs-3 stepBorder cheeseBtn"><img src="/icons/commodity/cheese.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Cheese</h3><h4 class="text-center stepText visible-md">Cheese</h4><p class="text-center stepText visible-sm visible-xs">Cheese</p></a><a href="#" class="col-xs-3 stepBorder milkBtn"><img src="/icons/commodity/milk.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Milk</h3><h4 class="text-center stepText visible-md">Milk</h4><p class="text-center stepText visible-sm visible-xs">Milk</p></a></div></div><div class="col-xs-12"><div>*All Icons are made by <a href="http://www.freepik.com" target="_blank" title="Freepik">Freepik</a> from <a target="_blank" href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a target="_blank" href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a></div></div>';
				}
				else if(group === 'livestock'){
					return '<div class="container-fluid"><div class="row"><a href="#" class="col-xs-3 stepBorder cattleBtn"><img src="/icons/commodity/cattle.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Cattle</h3><h4 class="text-center stepText visible-md">Cattle</h4><p class="text-center stepText visible-sm visible-xs">Cattle</p></a><a href="#" class="col-xs-3 stepBorder hogsBtn"><img src="/icons/commodity/hogs.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Hogs</h3><h4 class="text-center stepText visible-md">Hogs</h4><p class="text-center stepText visible-sm visible-xs">Hogs</p></a><a href="#" class="col-xs-3 stepBorder sheepBtn"><img src="/icons/commodity/sheep.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Sheep</h3><h4 class="text-center stepText visible-md">Sheep</h4><p class="text-center stepText visible-sm visible-xs">Sheep</p></a></div></div><div class="col-xs-12"><div>*All Icons are made by <a href="http://www.freepik.com" target="_blank" title="Freepik">Freepik</a> from <a target="_blank" href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a target="_blank" href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a></div></div>';
				}
				else if (group === 'poultry'){
					return '<div class="container-fluid"><div class="row"><a href="#" class="col-xs-3 stepBorder chickensBtn"><img src="/icons/commodity/chicken.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Chicken</h3><h4 class="text-center stepText visible-md">Chicken</h4><p class="text-center stepText visible-sm visible-xs">Chicken</p></a><a href="#" class="col-xs-3 stepBorder turkeysBtn"><img src="/icons/commodity/turkey.png" class="img-responsive"><h3 class="text-center stepText visible-lg">Turkey</h3><h4 class="text-center stepText visible-md">Turkey</h4><p class="text-center stepText visible-sm visible-xs">Turkey</p></a></div></div><div class="col-xs-12"><div>*All Icons are made by <a href="http://www.freepik.com" target="_blank" title="Freepik">Freepik</a> from <a target="_blank" href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a target="_blank" href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a></div></div>';
				}
			}
		});
		form.steps('next');
	};

	step2Func = function(form, commodity, availableCountry){
		form.steps('remove', 2);
		form.steps("insert", 2, {
			title: "State",
			content: function(){
				if ((commodity === 'cheese' && availableCountry.length > 0) || commodity === 'potatoes' || commodity === 'tomatoes' || commodity === 'milk' || commodity === 'cattle' || commodity === 'hogs' || commodity === 'sheep' || commodity === 'chickens' || commodity === 'turkeys' || commodity === 'barley' || commodity === 'corn' || commodity === 'herbs' || commodity === 'peas' || commodity === 'soybeans' || commodity === 'sunflower' || commodity === 'wheat'){
					return '<p>To select an available state, click a state that colored in green in the map below:</p><div class="col-xs-push-2" id="vmap" style="width: 600px; height: 400px;"></div>'	
				} else {
					return '<p>To select US total, click this button: <button type="button" class="btn btn-default btn-sm selectAllStates">Select all available states</button></p><p>To select an available state, click a state that colored in green in the map below:</p><div class="col-xs-push-2" id="vmap" style="width: 600px; height: 400px;"></div>'	
				}
			}
			// <p>To select US total, click this button: <button type="button" class="btn btn-default btn-sm selectAllStates">Select all available states</button></p>
		});
		form.steps('next');

		// initiate jqvmap
		jQuery('#vmap').vectorMap({
			map: 'usa_en',
			backgroundColor: null,
			color: '#ffffff',
			hoverColor: '#B8E6B8',
			selectedColor: '#E0FFD6',
			enableZoom: false,
			showTooltip: true,
			selectedRegions: availableCountry,
			onRegionClick: function(element, code, region){
				var found = _.find(availableCountry, function(item){
					return code.toUpperCase() === item;
				});

				if(found){
					Session.set('stateChecker', region);
					step3Func(form, commodity, region);
				} else {
					alert('Please choose available state only.');
					form.steps('previous');
				}
			}
		});
	};

	step3Func = function(form, commodity, region){
		form.steps('remove', 3);
		form.steps("insert", 3, {
			title: "Year",
			content: '<legend>Please select the year available:</legend><select id="yearPicker"><option value="none">--select a year--</option><option value="allYear">Select all available year</option></select>'
		});
		form.steps('next');
	};

	cancelFunc = function(form, group){
		Session.set(group, 0);

		for(var j=form.steps('getCurrentIndex'); j>0; j--){
			form.steps("previous");
		}
	};

	// plot 1 line result graph
	plotLineChart = function(arrayData, commodity, unit){
		// initiate morris.js graph plot
		Morris.Line({
			resize: true,
			element: 'lineChart',
			data: arrayData,
			xkey: 'year',
			ykeys: ['avgValue'],
			labels: ['Total avg. value for ' + commodity + ' (' + unit + ')']
		});
	};

	// plot multiple lines result graph
	plotDonutChart = function(arrayData, commodity, unit){
		// initiate morris.js graph plot
		Morris.Donut({
			resize: true,
			element: 'donutChart',
			data: arrayData,
		});
	};
}