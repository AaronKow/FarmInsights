Template.economicsAnimalsProductsModal.onRendered(function () {
	var form = $("#economicsAnimalsProductsForm");
	form.steps({
		headerTag: "h3",
		bodyTag: "section",
		transitionEffect: "slideLeft",
		autoFocus: true,
		onStepChanging: function(event, currentIndex, newIndex){
			// Allways allow previous action even if the current form is not valid!
			if (currentIndex > newIndex)
			{
				return true;
			}
			else if(Session.get('groupChecker') !== 0){
				return true;
			}
		},
		onCanceled: function(event){
			$('#economicsAnimalsProductsModal').modal('hide');
			// cancelFunc from global_components.js
			cancelFunc(form, 'groupChecker');
		}
	});

	// Perform the cancel function when the modal is hidden
	$('#economicsAnimalsProductsModal').on('hidden.bs.modal', function(){
		// cancelFunc from global_components.js
		cancelFunc(form, 'groupChecker');
	});
});

Template.economicsAnimalsProductsModal.events({
	'click .dairyBtn': function(){
		Session.set('groupChecker', 1);
		step1Func($("#economicsAnimalsProductsForm"), 'dairy');
	},
	'click .livestockBtn': function(){
		Session.set('groupChecker', 1);
		step1Func($("#economicsAnimalsProductsForm"), 'livestock');
	},
	'click .poultryBtn': function(){
		Session.set('groupChecker', 1);
		step1Func($("#economicsAnimalsProductsForm"), 'poultry');
	},
	'click .cheeseBtn': function(){
		var availableCountry = [];	// available in other states only
		Session.set('commodityChecker', 'cheese');
		step2Func($("#economicsAnimalsProductsForm"), 'cheese', availableCountry);
	},
	'click .milkBtn': function(){
		var availableCountry = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'milk');
		step2Func($("#economicsAnimalsProductsForm"), 'milk', availableCountry);
	},
	'click .cattleBtn': function(){
		var availableCountry = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'cattle');
		step2Func($("#economicsAnimalsProductsForm"), 'cattle', availableCountry);
	},
	'click .hogsBtn': function(){
		var availableCountry = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'hogs');
		step2Func($("#economicsAnimalsProductsForm"), 'hogs', availableCountry);
	},
	'click .sheepBtn': function(){
		var availableCountry = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'sheep');
		step2Func($("#economicsAnimalsProductsForm"), 'sheep', availableCountry);
	},
	'click .chickensBtn': function(){
		var availableCountry = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'chickens');
		step2Func($("#economicsAnimalsProductsForm"), 'chickens', availableCountry);
	},
	'click .turkeysBtn': function(){
		var availableCountry = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'turkeys');
		step2Func($("#economicsAnimalsProductsForm"), 'turkeys', availableCountry);
	},
	'click .selectAllStates': function(){
		Session.set('stateChecker', 'allStates');
		step3Func($("#economicsAnimalsProductsForm"), Session.get('commodityChecker'), 'allStates');
	},
	'change #yearPicker': function(evt){
		$("div").remove("#dataAwaiting");
		$("div").remove("#graphContent");
		$("a").remove('#rawDataBtn');

		var commodity = Session.get('commodityChecker').toUpperCase();
		var state = Session.get('stateChecker').toUpperCase();
		var year = $(evt.target).val();
		var unit;

		if(Session.get('commodityChecker') === 'cattle'){
			unit = '$';
		}
		else if(Session.get('commodityChecker') === 'chickens' || Session.get('commodityChecker') === 'turkeys'){
			unit = 'HEAD';
		} else {
			unit = 'LB';
		}

		// arguments detail: analyzer type, statistical description, data item, commodity selected, state selected, year selected
		Meteor.call('fetchUSDA', 'economicsAnalyzer', 'SALES', unit, commodity, state, year, function(err, arrayData){
			// plot graph after data is fetch
			if(arrayData[1].length > 0){
				$("div").remove("#dataAwaiting");
				$("div").remove("#graphContent");
				$("a").remove('#rawDataBtn');
				
				if(arrayData[0] === 'ALLSTATES'){
					$('#checkpoint1').append('<div class="col-sm-10 col-md-10 content" id="graphContent"><div class="panel panel-default"><div class="panel-heading">Result for ' + Session.get('commodityChecker') + ' in ' + Session.get('stateChecker') + ' <strong>(Unit in ' + unit + ')</strong></div><div class="panel-body"><div id="donutChart" style="height: 300px;"></div><div id="lineChart" style="height: 300px;"></div></div></div></div>');
					$('#checkpoint2').append('<a type="button" target="_blank" href="' + arrayData[3] + '" class="btn btn-default btn-lg" id="rawDataBtn">Click here for raw data</a>');
					plotDonutChart(arrayData[2], Session.get('commodityChecker'), unit);
					plotLineChart(arrayData[1], Session.get('commodityChecker'), unit);

				} else {
					$('#checkpoint1').append('<div class="col-sm-10 col-md-10 content" id="graphContent"><div class="panel panel-default"><div class="panel-heading">Result for ' + Session.get('commodityChecker') + ' in ' + Session.get('stateChecker') + ' <strong>(Unit in ' + unit + ')</strong></div><div class="panel-body"><div id="lineChart" style="height: 250px;"></div></div></div></div>');
					$('#checkpoint2').append('<a type="button" target="_blank" href="' + arrayData[3] + '" class="btn btn-default btn-lg" id="rawDataBtn">Click here for raw data</a>');
					plotLineChart(arrayData[1], Session.get('commodityChecker'), unit);
				}
			} else {
				$("div").remove("#dataAwaiting");
				$("div").remove("#graphContent");
				$("a").remove('#rawDataBtn');
					$('#checkpoint2').append('<a type="button" target="_blank" href="' + arrayData[3] + '" class="btn btn-default btn-lg" id="rawDataBtn">Click here for raw data</a>');
				$('#checkpoint1').append('<div class="col-sm-10 col-md-10 content" id="dataAwaiting"><div class="panel panel-default"><div class="panel-heading">Awaiting Data</div><div class="panel-body"><h1>Sorry, the data is not available for public.</h1><h3>Check the raw data for more detail.</h3></div></div></div>');
			}
		});
		$('#economicsAnimalsProductsModal').modal('hide');
		if(Session.get('stateChecker') === 'allStates'){
			$('#checkpoint1').append('<div class="col-sm-10 col-md-10 content" id="dataAwaiting"><div class="panel panel-default"><div class="panel-heading">Awaiting Data</div><div class="panel-body"><h1>Please wait, fetching data from NASS (Quickstats) ...</h1><h3>Choosing all states normally process longer than usual ...</h3></div></div></div>');
		} else {
			$('#checkpoint1').append('<div class="col-sm-10 col-md-10 content" id="dataAwaiting"><div class="panel panel-default"><div class="panel-heading">Awaiting Data</div><div class="panel-body"><h1>Please wait, fetching data from NASS (Quickstats) ...</h1></div></div></div>');
		}
	}
});

Template.economicsCropsModal.onRendered(function () {
	var form = $("#economicsCropsForm");
	form.steps({
		headerTag: "h3",
		bodyTag: "section",
		transitionEffect: "slideLeft",
		autoFocus: true,
		onStepChanging: function(event, currentIndex, newIndex){
			// Allways allow previous action even if the current form is not valid!
			if (currentIndex > newIndex)
			{
				return true;
			}
			else if(Session.get('groupChecker') !== 0){
				return true;
			}
		},
		onCanceled: function(event){
			$('#economicsCropsModal').modal('hide');
			// cancelFunc from global_components.js
			cancelFunc(form, 'groupChecker');
		}
	});

	// Perform the cancel function when the modal is hidden
	$('#economicsCropsModal').on('hidden.bs.modal', function(){
		// cancelFunc from global_components.js
		cancelFunc(form, 'groupChecker');
	});
});

Template.economicsCropsModal.events({
	'click .fruitsBtn': function(){
		Session.set('groupChecker', 1);
		step1Func($("#economicsCropsForm"), 'fruit');
	},
	'click .cropsBtn': function(){
		Session.set('groupChecker', 1);
		step1Func($("#economicsCropsForm"), 'crop');
	},
	'click .vegeBtn': function(){
		Session.set('groupChecker', 1);
		step1Func($("#economicsCropsForm"), 'vege');
	},
	'click .appleBtn': function(){
		var availableCountry = ["AL", "AZ", "CA", "CO", "CT", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "OH", "OK", "OR", "PA", "RI", "SC", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'apples');
		step2Func($("#economicsCropsForm"), 'apples', availableCountry);
	},
	'click .avocadoBtn': function(){
		var availableCountry = ['CA', 'FL', 'HI'];
		Session.set('commodityChecker', 'avocados');
		step2Func($("#economicsCropsForm"), 'avocados', availableCountry);
	},
	'click .bananaBtn': function(){
		var availableCountry = ['HI'];
		Session.set('commodityChecker', 'bananas');
		step2Func($("#economicsCropsForm"), 'bananas', availableCountry);
	},
	'click .coffeeBtn': function(){
		var availableCountry = ['HI'];
		Session.set('commodityChecker', 'coffee');
		step2Func($("#economicsCropsForm"), 'coffee', availableCountry);
	},
	'click .lemonBtn': function(){
		var availableCountry = ['AZ', 'CA', 'FL', 'HI', 'LA', 'TX'];
		Session.set('commodityChecker', 'lemons');
		step2Func($("#economicsCropsForm"), 'lemons', availableCountry);
	},
	'click .pearBtn': function(){
		var availableCountry = ["AZ", "AR", "CA", "CO", "CT", "FL", "GA", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NH", "NJ", "NM", "NY", "NC", "OH", "OK", "OR", "PA", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI"];
		Session.set('commodityChecker', 'pears');
		step2Func($("#economicsCropsForm"), 'pears', availableCountry);
	},
	'click .strawberryBtn': function(){
		var availableCountry = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
		Session.set('commodityChecker', 'strawberries');
		step2Func($("#economicsCropsForm"), 'strawberries', availableCountry);
	},
	'click .barleyBtn': function(){
		var availableCountry = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "GA", "ID", "IL", "IN", "IA", "KS", "KY", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'barley');
		step2Func($("#economicsCropsForm"), 'barley', availableCountry);
	},
	'click .cornBtn': function(){
		var availableCountry = ["AL", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'corn');
		step2Func($("#economicsCropsForm"), 'corn', availableCountry);
	},
	'click .herbBtn': function(){
		var availableCountry = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'herbs');
		step2Func($("#economicsCropsForm"), 'herbs', availableCountry);
	},
	'click .peasBtn': function(){
		var availableCountry = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'peas');
		step2Func($("#economicsCropsForm"), 'peas', availableCountry);
	},
	'click .soybeanBtn': function(){
		var availableCountry = ["AL", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'soybeans');
		step2Func($("#economicsCropsForm"), 'soybeans', availableCountry);
	},
	'click .sunflowerBtn': function(){
		var availableCountry = ["AL", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'sunflower');
		step2Func($("#economicsCropsForm"), 'sunflower', availableCountry);
	},
	'click .wheatBtn': function(){
		var availableCountry = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'wheat');
		step2Func($("#economicsCropsForm"), 'wheat', availableCountry);
	},
	'click .artichokeBtn': function(){
		var availableCountry = ["AZ", "CA", "HI", "NM", "OR", "TX", "WA"];
		Session.set('commodityChecker', 'artichokes');
		step2Func($("#economicsCropsForm"), 'artichokes', availableCountry);
	},
	'click .broccoliBtn': function(){
		var availableCountry = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'broccoli');
		step2Func($("#economicsCropsForm"), 'broccoli', availableCountry);
	},
	'click .carrotBtn': function(){
		var availableCountry = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'carrots');
		step2Func($("#economicsCropsForm"), 'carrots', availableCountry);
	},
	'click .eggplantBtn': function(){
		var availableCountry = ["AL", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI"];
		Session.set('commodityChecker', 'eggplant');
		step2Func($("#economicsCropsForm"), 'eggplant', availableCountry);
	},
	'click .garlicBtn': function(){
		var availableCountry = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'garlic');
		step2Func($("#economicsCropsForm"), 'garlic', availableCountry);
	},
	'click .onionBtn': function(){
		var availableCountry = ["CA", "CO", "GA", "ID", "MI", "NV", "NM", "NY", "TX", "WA", "WI"];
		Session.set('commodityChecker', 'onions');
		step2Func($("#economicsCropsForm"), 'onions', availableCountry);
	},
	'click .potatoBtn': function(){
		var availableCountry = ["AZ", "CA", "CO", "DE", "FL", "ID", "IL", "KS", "ME", "MD", "MA", "MI", "MN", "MO", "MT", "NE", "NV", "NJ", "NM", "NY", "NC", "ND", "OH", "OR", "PA", "RI", "TX", "VA", "WA", "WI"];
		Session.set('commodityChecker', 'potatoes');
		step2Func($("#economicsCropsForm"), 'potatoes', availableCountry);
	},
	'click .tomatoBtn': function(){
		var availableCountry = ["AL", "AR", "CA", "FL", "GA", "IN", "MI", "NJ", "NY", "NC", "OH", "PA", "SC", "TN", "TX", "VA"];
		Session.set('commodityChecker', 'tomatoes');
		step2Func($("#economicsCropsForm"), 'tomatoes', availableCountry);
	},
	'click .selectAllStates': function(){
		Session.set('stateChecker', 'allStates');
		step3Func($("#economicsCropsForm"), Session.get('commodityChecker'), 'allStates');
	},
	'change #yearPicker': function(evt){
		$("div").remove("#dataAwaiting");
		$("div").remove("#graphContent");
		$("a").remove('#rawDataBtn');

		var unit;
		var commodity = Session.get('commodityChecker').toUpperCase();
		var state = Session.get('stateChecker').toUpperCase();
		var year = $(evt.target).val();

		// only eggplant have no 'sales' category from NASS (Quickstats)
		if(commodity === 'EGGPLANT'){
			unit = 'PRODUCTION';
		} else {
			unit = 'SALES';
		}

		// arguments detail: analyzer type, statistical description, data item, commodity selected, state selected, year selected
		Meteor.call('fetchUSDA', 'economicsAnalyzer', unit, '$', commodity, state, year, function(err, arrayData){
			// plot graph after data is fetch
			if(arrayData[1].length > 0){
				$("div").remove("#dataAwaiting");
				$("div").remove("#graphContent");
				$("a").remove('#rawDataBtn');
				
				if(arrayData[0] === 'ALLSTATES'){
					$('#checkpoint1').append('<div class="col-sm-10 col-md-10 content" id="graphContent"><div class="panel panel-default"><div class="panel-heading">Result for ' + Session.get('commodityChecker') + ' in ' + Session.get('stateChecker') + ' <strong>(Unit in $)</strong></div><div class="panel-body"><div id="donutChart" style="height: 300px;"></div><div id="lineChart" style="height: 300px;"></div></div></div></div>');
					$('#checkpoint2').append('<a type="button" target="_blank" href="' + arrayData[3] + '" class="btn btn-default btn-lg" id="rawDataBtn">Click here for raw data</a>');
					plotDonutChart(arrayData[2], Session.get('commodityChecker'), '$');
					plotLineChart(arrayData[1], Session.get('commodityChecker'), '$');

				} else {
					$('#checkpoint1').append('<div class="col-sm-10 col-md-10 content" id="graphContent"><div class="panel panel-default"><div class="panel-heading">Result for ' + Session.get('commodityChecker') + ' in ' + Session.get('stateChecker') + ' <strong>(Unit in $)</strong></div><div class="panel-body"><div id="lineChart" style="height: 250px;"></div></div></div></div>');
					$('#checkpoint2').append('<a type="button" target="_blank" href="' + arrayData[3] + '" class="btn btn-default btn-lg" id="rawDataBtn">Click here for raw data</a>');
					plotLineChart(arrayData[1], Session.get('commodityChecker'), '$');
				}
			} else {
				$("div").remove("#dataAwaiting");
				$("div").remove("#graphContent");
				$("a").remove('#rawDataBtn');
				$('#checkpoint2').append('<a type="button" target="_blank" href="' + arrayData[3] + '" class="btn btn-default btn-lg" id="rawDataBtn">Click here for raw data</a>');
				$('#checkpoint1').append('<div class="col-sm-10 col-md-10 content" id="dataAwaiting"><div class="panel panel-default"><div class="panel-heading">Awaiting Data</div><div class="panel-body"><h1>Sorry, the data is not available for public.</h1><h3>Check the raw data for more detail.</h3></div></div></div>');
			}
		});
		$('#economicsCropsModal').modal('hide');
		if(Session.get('stateChecker') === 'allStates'){
			$('#checkpoint1').append('<div class="col-sm-10 col-md-10 content" id="dataAwaiting"><div class="panel panel-default"><div class="panel-heading">Awaiting Data</div><div class="panel-body"><h1>Please wait, fetching data from NASS (Quickstats) ...</h1><h3>Choosing all states normally process longer than usual ...</h3></div></div></div>');
		} else {
			$('#checkpoint1').append('<div class="col-sm-10 col-md-10 content" id="dataAwaiting"><div class="panel panel-default"><div class="panel-heading">Awaiting Data</div><div class="panel-body"><h1>Please wait, fetching data from NASS (Quickstats) ...</h1></div></div></div>');
		}
	}
});