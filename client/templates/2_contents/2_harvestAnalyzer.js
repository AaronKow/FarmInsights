// checker to determine whether any group been selected, if no group selected will return 0
Session.setDefault('groupChecker', 0);
// checker to determine which commodity user has select
Session.setDefault('commodityChecker', '');
// checker to determine which state user has select
Session.setDefault('stateChecker', '');

Template.harvestAnalyzer.onRendered(function () {
	var form = $("#harvestCropsForm");
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
			$('#harvestCropsModal').modal('hide');
			// cancelFunc from global_components.js
			cancelFunc(form, 'groupChecker');
		}
	});

	// Perform the cancel function when the modal is hidden
	$('#harvestCropsModal').on('hidden.bs.modal', function(){
		// cancelFunc from global_components.js
		cancelFunc(form, 'groupChecker');
	});
});

Template.harvestCropsModal.events({
	'click .fruitsBtn': function(){
		Session.set('groupChecker', 1);
		step1Func($("#harvestCropsForm"), 'fruit');
	},
	'click .cropsBtn': function(){
		Session.set('groupChecker', 1);
		step1Func($("#harvestCropsForm"), 'crop');
	},
	'click .vegeBtn': function(){
		Session.set('groupChecker', 1);
		step1Func($("#harvestCropsForm"), 'vege');
	},
	'click .appleBtn': function(){
		var availableCountry = ["AL", "AZ", "CA", "CO", "CT", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "OH", "OK", "OR", "PA", "RI", "SC", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'apples');
		step2Func($("#harvestCropsForm"), 'apples', availableCountry);
	},
	'click .avocadoBtn': function(){
		var availableCountry = ['CA', 'FL', 'HI'];
		Session.set('commodityChecker', 'avocados');
		step2Func($("#harvestCropsForm"), 'avocados', availableCountry);
	},
	'click .bananaBtn': function(){
		var availableCountry = ['HI'];
		Session.set('commodityChecker', 'bananas');
		step2Func($("#harvestCropsForm"), 'bananas', availableCountry);
	},
	'click .coffeeBtn': function(){
		var availableCountry = ['HI'];
		Session.set('commodityChecker', 'coffee');
		step2Func($("#harvestCropsForm"), 'coffee', availableCountry);
	},
	'click .lemonBtn': function(){
		var availableCountry = ['AZ', 'CA', 'FL', 'HI', 'LA', 'TX'];
		Session.set('commodityChecker', 'lemons');
		step2Func($("#harvestCropsForm"), 'lemons', availableCountry);
	},
	'click .pearBtn': function(){
		var availableCountry = ["AZ", "AR", "CA", "CO", "CT", "FL", "GA", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NH", "NJ", "NM", "NY", "NC", "OH", "OK", "OR", "PA", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI"];
		Session.set('commodityChecker', 'pears');
		step2Func($("#harvestCropsForm"), 'pears', availableCountry);
	},
	'click .strawberryBtn': function(){
		var availableCountry = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
		Session.set('commodityChecker', 'strawberries');
		step2Func($("#harvestCropsForm"), 'strawberries', availableCountry);
	},
	'click .barleyBtn': function(){
		var availableCountry = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "GA", "ID", "IL", "IN", "IA", "KS", "KY", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'barley');
		step2Func($("#harvestCropsForm"), 'barley', availableCountry);
	},
	'click .cornBtn': function(){
		var availableCountry = ["AL", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'corn');
		step2Func($("#harvestCropsForm"), 'corn', availableCountry);
	},
	'click .herbBtn': function(){
		var availableCountry = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'herbs');
		step2Func($("#harvestCropsForm"), 'herbs', availableCountry);
	},
	'click .peasBtn': function(){
		var availableCountry = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'peas');
		step2Func($("#harvestCropsForm"), 'peas', availableCountry);
	},
	'click .soybeanBtn': function(){
		var availableCountry = ["AL", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'soybeans');
		step2Func($("#harvestCropsForm"), 'soybeans', availableCountry);
	},
	'click .sunflowerBtn': function(){
		var availableCountry = ["AL", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'sunflower');
		step2Func($("#harvestCropsForm"), 'sunflower', availableCountry);
	},
	'click .wheatBtn': function(){
		var availableCountry = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'wheat');
		step2Func($("#harvestCropsForm"), 'wheat', availableCountry);
	},
	'click .artichokeBtn': function(){
		var availableCountry = ["AZ", "CA", "HI", "NM", "OR", "TX", "WA"];
		Session.set('commodityChecker', 'artichokes');
		step2Func($("#harvestCropsForm"), 'artichokes', availableCountry);
	},
	'click .broccoliBtn': function(){
		var availableCountry = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'broccoli');
		step2Func($("#harvestCropsForm"), 'broccoli', availableCountry);
	},
	'click .carrotBtn': function(){
		var availableCountry = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'carrots');
		step2Func($("#harvestCropsForm"), 'carrots', availableCountry);
	},
	'click .eggplantBtn': function(){
		var availableCountry = ["AL", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI"];
		Session.set('commodityChecker', 'eggplant');
		step2Func($("#harvestCropsForm"), 'eggplant', availableCountry);
	},
	'click .garlicBtn': function(){
		var availableCountry = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
		Session.set('commodityChecker', 'garlic');
		step2Func($("#harvestCropsForm"), 'garlic', availableCountry);
	},
	'click .onionBtn': function(){
		var availableCountry = ["CA", "CO", "GA", "ID", "MI", "NV", "NM", "NY", "TX", "WA", "WI"];
		Session.set('commodityChecker', 'onions');
		step2Func($("#harvestCropsForm"), 'onions', availableCountry);
	},
	'click .potatoBtn': function(){
		var availableCountry = ["AZ", "CA", "CO", "DE", "FL", "ID", "IL", "KS", "ME", "MD", "MA", "MI", "MN", "MO", "MT", "NE", "NV", "NJ", "NM", "NY", "NC", "ND", "OH", "OR", "PA", "RI", "TX", "VA", "WA", "WI"];
		Session.set('commodityChecker', 'potatoes');
		step2Func($("#harvestCropsForm"), 'potatoes', availableCountry);
	},
	'click .tomatoBtn': function(){
		var availableCountry = ["AL", "AR", "CA", "FL", "GA", "IN", "MI", "NJ", "NY", "NC", "OH", "PA", "SC", "TN", "TX", "VA"];
		Session.set('commodityChecker', 'tomatoes');
		step2Func($("#harvestCropsForm"), 'tomatoes', availableCountry);
	},
	'click .selectAllStates': function(){
		Session.set('stateChecker', 'allStates');
		step3Func($("#harvestCropsForm"), Session.get('commodityChecker'), 'allStates');
	},
	'change #yearPicker': function(evt){
		$("div").remove("#dataAwaiting");
		$("div").remove("#graphContent");
		$("a").remove('#rawDataBtn');

		var commodity = Session.get('commodityChecker').toUpperCase();
		var state = Session.get('stateChecker').toUpperCase();
		var year = $(evt.target).val();

		// arguments detail: analyzer type, statistical description, data item, commodity selected, state selected, year selected
		Meteor.call('fetchUSDA', 'harvestAnalyzer', 'AREA%20HARVESTED', 'ACRES', commodity, state, year, function(err, arrayData){
			// plot graph after data is fetch
			if(arrayData !== []){
				$("div").remove("#dataAwaiting");
				$("div").remove("#graphContent");
				$("a").remove('#rawDataBtn');
				
				if(arrayData[0] === 'ALLSTATES'){
					$('#checkpoint1').append('<div class="col-sm-10 col-md-10 content" id="graphContent"><div class="panel panel-default"><div class="panel-heading">Result for ' + Session.get('commodityChecker') + ' in ' + Session.get('stateChecker') + ' <strong>(Unit in acres)</strong></div><div class="panel-body"><div id="donutChart" style="height: 300px;"></div><div id="lineChart" style="height: 300px;"></div></div></div></div>');
					$('#checkpoint2').append('<a type="button" target="_blank" href="' + arrayData[3] + '" class="btn btn-default btn-lg" id="rawDataBtn">Click here for raw data</a>');
					plotDonutChart(arrayData[2], Session.get('commodityChecker'), 'acres');
					plotLineChart(arrayData[1], Session.get('commodityChecker'), 'acres');

				} else {
					$('#checkpoint1').append('<div class="col-sm-10 col-md-10 content" id="graphContent"><div class="panel panel-default"><div class="panel-heading">Result for ' + Session.get('commodityChecker') + ' in ' + Session.get('stateChecker') + ' <strong>(Unit in acres)</strong></div><div class="panel-body"><div id="lineChart" style="height: 250px;"></div></div></div></div>');
					$('#checkpoint2').append('<a type="button" target="_blank" href="' + arrayData[3] + '" class="btn btn-default btn-lg" id="rawDataBtn">Click here for raw data</a>');
					plotLineChart(arrayData[1], Session.get('commodityChecker'), 'acres');
				}
			}
		});
		$('#harvestCropsModal').modal('hide');
		if(Session.get('stateChecker') === 'allStates'){
			$('#checkpoint1').append('<div class="col-sm-10 col-md-10 content" id="dataAwaiting"><div class="panel panel-default"><div class="panel-heading">Awaiting Data</div><div class="panel-body"><h1>Please wait, fetching data from NASS (Quickstats) ...</h1><h3>Choosing all states normally process longer than usual ...</h3></div></div></div>');
		} else {
			$('#checkpoint1').append('<div class="col-sm-10 col-md-10 content" id="dataAwaiting"><div class="panel panel-default"><div class="panel-heading">Awaiting Data</div><div class="panel-body"><h1>Please wait, fetching data from NASS (Quickstats) ...</h1></div></div></div>');
		}
	}
});

Template.harvestCrops.events({
	'change #testing': function(evt){
		alert($(evt.target).val());
	}
});