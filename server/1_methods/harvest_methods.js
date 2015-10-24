if(Meteor.isServer){
	Meteor.methods({
		'setGroup': function(group){
			check(group, String);

			// remove existing user data and create new
			HarvestCrops.remove({'owner_id': Meteor.userId()});
			HarvestCrops.insert({
				'owner_id': Meteor.userId(),
				'group_selected': group
			});
		}
	});
}