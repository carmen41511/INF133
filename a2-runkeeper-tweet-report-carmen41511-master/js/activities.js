function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.

	let act_norepeat = [];
	let act = [];
	for (const activity of tweet_array){
		act.push(activity.activityType.trim())
		if (!act_norepeat.includes(activity.activityType.trim())){
			act_norepeat.push(activity.activityType.trim())
		}
	}
	//find the 3 most frequent: run, walk, bike
	var obj = {};
	act.forEach(function(e){
		if (obj.hasOwnProperty(e)){
			obj[e]++;}
		else{obj[e]=1}
	})
	best = 0;
	M = -1;
	for (const [i, twt] of tweet_array.entries()){
		if (twt.distance > M){
			best = i; M = twt.distance;
		}
	}

	let first_act = Object.keys(obj).sort(function(a,b){return obj[b]-obj[a]})[0];
	let sec_act = Object.keys(obj).sort(function(a,b){return obj[b]-obj[a]})[1];
	let third_act = Object.keys(obj).sort(function(a,b){return obj[b]-obj[a]})[2];

	$("#numberActivities").text(act_norepeat.length)
	$("#firstMost").text(first_act)
	$("#secondMost").text(sec_act)
	$("#thirdMost").text(third_act)
	
	
	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.

	activity_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
	  	"description": "A graph of the number of Tweets containing each type of activity.",
		"mark": "bar",
		"data": {
			values: tweet_array.map(twt => (
				{
				'distance': twt.distance,
				'date': twt.time,
				'activity': twt.activityType
			}))
		  },
		"encoding":{
			"y": {
				"aggregate": "count",
				"type": "quantitative",
			},
			"x":{"field":"activity",
			"sort": {"encoding": "y"},
				"type":"nominal"}
		}
	}
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});


	activity_distance_vis ={
		"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
		"description": "A graph of the number of Tweets containing each type of activity.",
		"data": {
		  values: tweet_array.filter(twt => (
			  twt.activityType === first_act || 
			  twt.activityType === sec_act ||
			  twt.activityType === third_act
			  )).map(twt => (
			  {
			  'distance': twt.distance,
			  'date': twt.time,
			  'activity': twt.activityType
		  }))
		},
		//TODO: Add mark and encoding
		"mark": "point",
		"encoding":{
			"y":{
			  "field":"distance",
			  "type": "quantitative",
			  // "aggregate": "mean",
			},
			"x":{
			  "field": "date",
			  "type": "ordinal",
			  "timeUnit": "day",
			  "axis":{"title": "time(day)"},
			  "sort": ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
			},
			scale: {
			  domain:["activity1","activity2","activity3"],
			  range: ["#e7ba52","#c7c7c7","#aec7e8"]
			},
			"color": {"field": "activity", "type": "nominal"},
		}
	  }
			

	activity_agg_vis = {
		"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
				"description": "A graph of the number of Tweets containing each type of activity.",
				"data": {
				  values: tweet_array.filter(twt => (
					  twt.activityType === first_act || 
					  twt.activityType === sec_act ||
					  twt.activityType === third_act
					  )).map(twt => (
					  {
					  'distance': twt.distance,
					  'date': twt.time,
					  'activity': twt.activityType
				  }))
				},
				//TODO: Add mark and encoding
				"mark": "point",
				"encoding":{
					"y":{
					  "field":"distance",
					  "type": "quantitative",
					  "aggregate": "mean",
					},
					"x":{
					  "field": "date",
					  "type": "ordinal",
					  "timeUnit": "day",
					  "axis":{"title": "time(day)"},
					  "sort": ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
					},
					scale: {
					  domain:["activity1","activity2","activity3"],
					  range: ["#e7ba52","#c7c7c7","#aec7e8"]
					},
					"color": {"field": "activity", "type": "nominal"},
					}
	}
	// button text
	// whether to show mean or not
	// if true, now graph is non-mean
	let show_mean = true;
	$('#aggregate').on('click', function(){
		if (show_mean){
			$(this).text("Show all activities");
			
			vegaEmbed('#distanceVisAggregated', activity_agg_vis, {actions:false});
			$('#distanceVis').text("");
		}
		else{
			// show mean graph
			$(this).text("Show mean");
			vegaEmbed('#distanceVis', activity_distance_vis, {actions:false});
			$('#distanceVisAggregated').text("");	
			// show_mean = true;
		}
		show_mean = !show_mean;
	})
	vegaEmbed('#distanceVis', activity_distance_vis, {actions:false});
}



		

// $('#aggregate').on('click',function(event){
// 	if ($(this).text() === "Show means"){
// 		$(this).html('Show all activities')
// 		vegaEmbed('#distanceVisAggregated', activity_agg_vis, {actions:false});
// }
// 	else{
// 		$(this).html('Show means')
// 		vegaEmbed('#distanceVis', activity_distance_vis, {actions:false});
// 	}
// })


	
//Use those visualizations to answer the questions about which activities tended to be longest and when.



//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
})


	// vegaEmbed('#distanceVisAggregated', activity_agg_vis, {actions:false});


	// activity_vis_spec = {
	//   "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
	//   "description": "A graph of the number of Tweets containing each type of activity.",
	//   "data": {
	//     values: tweet_array.filter(twt => (
	// 		twt.activityType === first_act || 
	// 		twt.activityType === sec_act ||
	// 		twt.activityType === third_act
	// 		)).map(twt => (
	// 		{
	// 		'distance': twt.distance,
	// 		'date': twt.time,
	// 		'activity': twt.activityType
	// 	}))
	//   },
	//   //TODO: Add mark and encoding
	//   "mark": "point",
	//   "encoding":{
	// 	  "y":{
	// 		"field":"distance",
	// 		"type": "quantitative",
	// 		// "aggregate": "mean",
	// 	  },
	// 	  "x":{
	// 		"field": "date",
	// 		"type": "ordinal",
	// 		"timeUnit": "day",
	// 		"axis":{"title": "time(day)"},
	// 		"sort": ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	// 	  },
	// 	  scale: {
	// 		domain:["activity1","activity2","activity3"],
	// 		range: ["#e7ba52","#c7c7c7","#aec7e8"]
	// 	  },
	// 	  "color": {"field": "activity", "type": "nominal"},
	//   }
	// }

	// $('#aggregate').on('click',function(event){
	// 	if ($(this).text() === "Show Mean"){
	// 		$(this).html('Show all activities')
	// 		activity_vis_spec = {
	// 			"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
	// 			"description": "A graph of the number of Tweets containing each type of activity.",
	// 			"data": {
	// 			  values: tweet_array.filter(twt => (
	// 				  twt.activityType === first_act || 
	// 				  twt.activityType === sec_act ||
	// 				  twt.activityType === third_act
	// 				  )).map(twt => (
	// 				  {
	// 				  'distance': twt.distance,
	// 				  'date': twt.time,
	// 				  'activity': twt.activityType
	// 			  }))
	// 			},
	// 			//TODO: Add mark and encoding
	// 			"mark": "point",
	// 			"encoding":{
	// 				"y":{
	// 				  "field":"distance",
	// 				  "type": "quantitative",
	// 				  // "aggregate": "mean",
	// 				},
	// 				"x":{
	// 				  "field": "date",
	// 				  "type": "ordinal",
	// 				  "timeUnit": "day",
	// 				  "axis":{"title": "time(day)"},
	// 				  "sort": ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	// 				},
	// 				scale: {
	// 				  domain:["activity1","activity2","activity3"],
	// 				  range: ["#e7ba52","#c7c7c7","#aec7e8"]
	// 				},
	// 				"color": {"field": "activity", "type": "nominal"},
	// 			}
	// 		  }
	// 		  vegaEmbed('#distanceVis', activity_vis_spec, {actions:false});
	// 	}
	// 	else{
	// 		$(this).html("Show Mean")
	// 		activity_vis_spec = {
	// 			"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
	// 			"description": "A graph of the number of Tweets containing each type of activity.",
	// 			"data": {
	// 			  values: tweet_array.filter(twt => (
	// 				  twt.activityType === first_act || 
	// 				  twt.activityType === sec_act ||
	// 				  twt.activityType === third_act
	// 				  )).map(twt => (
	// 				  {
	// 				  'distance': twt.distance,
	// 				  'date': twt.time,
	// 				  'activity': twt.activityType
	// 			  }))
	// 			},
	// 			//TODO: Add mark and encoding
	// 			"mark": "point",
	// 			"encoding":{
	// 				"y":{
	// 				  "field":"distance",
	// 				  "type": "quantitative",
	// 				  "aggregate": "mean",
	// 				},
	// 				"x":{
	// 				  "field": "date",
	// 				  "type": "ordinal",
	// 				  "timeUnit": "day",
	// 				  "axis":{"title": "time(day)"},
	// 				  "sort": ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	// 				},
	// 				scale: {
	// 				  domain:["activity1","activity2","activity3"],
	// 				  range: ["#e7ba52","#c7c7c7","#aec7e8"]
	// 				},
	// 				"color": {"field": "activity", "type": "nominal"},
	// 			}
	// 		  }
	// 		  vegaEmbed('#distanceVisAggregated', activity_vis_spec, {actions:false});
	// 	}

	// });