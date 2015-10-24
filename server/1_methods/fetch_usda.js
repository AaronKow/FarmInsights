if(Meteor.isServer){
	Meteor.methods({
		'fetchUSDA': function(analyzer_type, stat_desc, dataItem, commodity, state, year){
        console.log(Meteor.user().username + ' is fetching data from NASS (Quickstats) ...');

        // Segregate the call API appropriately
        var url;
        if(state === 'ALLSTATES' && year === 'allYear'){
          url = 'http://nass-api.azurewebsites.net/api/api_get?commodity_desc=' + commodity + '&statisticcat_desc=' + stat_desc + '&agg_level_desc=STATE';
          var data = Meteor.http.call('GET', url);
        }
        else if(state !== 'ALLSTATES' && year === 'allYear'){
          url = 'http://nass-api.azurewebsites.net/api/api_get?commodity_desc=' + commodity + '&statisticcat_desc=' + stat_desc + '&agg_level_desc=STATE&state_name=' + state;
          var data = Meteor.http.call('GET', url);
        }
        else if(state !== 'ALLSTATES' && year !== 'allYear'){
          url ='http://nass-api.azurewebsites.net/api/api_get?commodity_desc=' + commodity + '&statisticcat_desc=' + stat_desc + '&agg_level_desc=STATE&state_name=' + state + '&year=' + year;
          var data = Meteor.http.call('GET', url);
        }

        // Parse the fetched string into JSON format
        var procData = JSON.parse(data.content);
        var arrayData = [], newArrayData1 = [], newArrayData2 = [], arrayVal = 0;


        // 1st loop use to store raw data that have numeric value
        for(var i=0; i<procData.data.length; i++){
          // store our desired data-item from USDA data and put it in our data array
          if((procData.data[i].data_item).indexOf(dataItem) >= 0){
            // [Bug Fix]: filter that make sure store only data values that are numeric
            var numCheck = procData.data[i].value.replace(/\D/g,'');
            if(!isNaN(parseInt(numCheck))){
              arrayData.push(procData.data[i]);
            }
          }
        }

        // 2nd loop to get the average value for the same year
        for(var j=0; j<arrayData.length; j++){
          _.each(arrayData, function(data1){
            if(arrayData[j].year === data1.year){
              arrayVal = data1.value.replace(/\D/g,''); // remove all non-numeric characters from string

              var found = _.find(newArrayData1, function(data2){
                return data2.year === data1.year;
              });
              if(!found){
                newArrayData1.push({
                  'year': data1.year,
                  'count': 1,
                  'totalValue': parseInt(arrayVal),
                  'avgValue': parseInt(arrayVal)/1
                });
              } else {
                found.count += 1;
                found.totalValue += parseInt(arrayVal);
                found.avgValue = found.totalValue/found.count;
              }
            }

            if(state === 'ALLSTATES'){
              if(arrayData[j].year === data1.year && arrayData[j].state_name === data1.state_name){

                arrayVal = data1.value.replace(/\D/g,''); // remove all non-numeric characters from string

                var found = _.find(newArrayData2, function(data2){
                  return (data2.year === data1.year && data2.state === data1.state_name);
                });
                if(!found){
                  newArrayData2.push({
                    'state': data1.state_name,
                    'label': data1.state_name + ', year ' + data1.year,
                    'year': data1.year,
                    'count': 1,
                    'totalValue': parseInt(arrayVal),
                    'value': (parseInt(arrayVal)/1).toFixed(2),
                    'avgValue': (parseInt(arrayVal)/1).toFixed(2)
                  });
                } else {
                  found.count += 1;
                  found.totalValue += parseInt(arrayVal);
                  found.value = (found.totalValue/found.count).toFixed(2);
                  found.avgValue = (found.totalValue/found.count).toFixed(2);
                }
              }
            }

          });
        }

        // 3rd loop responsible to remove all NaN in newArrayData1
        _.each(newArrayData1, function(data){
          if(isNaN(data.avgValue)){
            var foundIndex = newArrayData1.indexOf(data);
            newArrayData1.splice(foundIndex, 1);
          }
        });

        // 4th loop responsible to remove all NaN in newArrayData2
        _.each(newArrayData2, function(data){
          if(isNaN(data.avgValue)){
            var foundIndex = newArrayData2.indexOf(data);
            newArrayData2.splice(foundIndex, 1);
          }
        });

        return [state, newArrayData1, newArrayData2, url];
      }
	});
}