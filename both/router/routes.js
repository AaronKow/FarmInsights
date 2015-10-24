Router.configure({
	layoutTemplate: 'mainLayout',
	notFoundTemplate: 'notFound',
	loadingTemplate: 'loading'
});

Router.route('/', {
	onBeforeAction: function(){
		Router.go('/dashboard');
	}
});

Router.route('/dashboard', {
	onBeforeAction: function(){
		this.render('dashboard');
	},
	waitOn: function(){
		if(!Meteor.userId()){
			Router.go('/login');
		}
		return [Meteor.subscribe('forecastData'), Meteor.subscribe('hourForecastData'), Meteor.subscribe('temperaturePatternData')];
	},
	onAfterAction: function(){
		if(this.ready()) {
			SEO.set({
				title: "Dashboard | FarmInsights"
			});
		}
	}
});

Router.route('/harvestAnalyzer/:slug', {
	onBeforeAction: function(){
		if(this.params.slug === 'crops'){
			this.render('harvestAnalyzer');
		}
	},
	waitOn: function(){
		if(!Meteor.userId()){
			Router.go('/login');
		}
	},
	onAfterAction: function(){
		if(this.ready()) {
			SEO.set({
				title: "Harvest Analyzer | FarmInsights"
			});
		}
	}
});

Router.route('/economicsAnalyzer/:slug', {
	onBeforeAction: function(){
		if(this.params.slug === 'animals-and-products' || this.params.slug === 'crops'){
			this.render('economicsAnalyzer');
		}
	},
	waitOn: function(){
		if(!Meteor.userId()){
			Router.go('/login');
		}
	},
	onAfterAction: function(){
		if(this.ready()) {
			SEO.set({
				title: "Economics Analyzer | FarmInsights"
			});
		}
	}
});

Router.route('/foodAnalyzer/:slug', {
	onBeforeAction: function(){
		if(this.params.slug === 'animals-and-products' || this.params.slug === 'crops'){
			this.render('foodAnalyzer');
		}
	},
	waitOn: function(){
		if(!Meteor.userId()){
			Router.go('/login');
		}
	},
	onAfterAction: function(){
		if(this.ready()) {
			SEO.set({
				title: "Food Analyzer | FarmInsights"
			});
		}
	}
});