
function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;

	//update earliest and latest dates
	let firstdate = new Date(8640000000000000);
	let lastdate = new Date(-8640000000000000);
	let dateformat = { weekday: "long", 
                    year: "numeric", 
                    month: "short", 
                    day: "numeric" }; 

	tweet_array.forEach(function(twt) {
		if (firstdate > twt.time){
			firstdate = twt.time
		}
		if (lastdate < twt.time){
			lastdate = twt.time
		}
	})
	
	document.getElementById('firstDate').innerText = firstdate.toLocaleDateString("en-US",dateformat);
	// $('#firstDate').text(firstdate).toLocaleDateString("en-US",dateformat);
	
	document.getElementById('lastDate').innerText = lastdate.toLocaleDateString("en-US",dateformat);


	//calculate number of 4 categories
	let num_completed = 0;
	let num_live = 0;
	let num_achi = 0;
	let num_misc = 0;
	
	for (const tweet of tweet_array){
		if (tweet.source === 'live_event'){
			num_live += 1;
		}
		else if (tweet.source === 'achievement'){
			num_achi += 1;
		}
		else if (tweet.source === 'completed_event'){
			num_completed += 1;
		}
		else {
			num_misc += 1;
		}
	}

	//update number of 4 categories
	$(".completedEvents").text(num_completed);
	$(".liveEvents").text(num_live);
	$(".achievements").text(num_achi);
	$(".miscellaneous").text(num_misc);

	//calculate percent of 4 categories
	let num_tweet = tweet_array.length;
	let per_completed = parseFloat((num_completed/ num_tweet)*100).toFixed(2)+"%";
	let per_live = parseFloat((num_live/ num_tweet)*100).toFixed(2)+"%";
	let per_achi = parseFloat((num_achi/ num_tweet)*100).toFixed(2)+"%";
	let per_misc = parseFloat((num_misc/ num_tweet)*100).toFixed(2)+"%";
	
	//update percent of 4 categories
	$(".completedEventsPct").text(per_completed);
	$(".liveEventsPct").text(per_live);
	$(".achievementsPct").text(per_achi);
	$(".miscellaneousPct").text(per_misc);


	//calculate num & percent of user written content
	let num_written = 0;
	for (const content of tweet_array){
		if (content.written === true){
			console.log(content.writtenText)
			num_written += 1;
		}
	}
	let per_written = parseFloat((num_written/ num_completed)*100).toFixed(2)+"%";

	//update num & percent of user written content
	$(".written").text(num_written);
	$(".writtenPct").text(per_written);

}


//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});