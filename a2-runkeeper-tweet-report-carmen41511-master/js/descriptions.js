function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	runkeeper_tweets = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	runkeeper_tweets = runkeeper_tweets.filter(twt => 
		(
			twt.source === 'completed_event'
		)
	)

	//TODO: Filter to just the written tweets
	
	//  content = runkeeper_tweets.filter(function(written){
	// 	 console.log(written.text)
	// 	return written.text;
	// });

	// console.log(runkeeper_tweets)
	// function search_twt(input){
	// 	return runkeeper_tweets.filter(twt => (
	// 		twt.text.includes(input)
	// 	))
	// }

	// $('#textFilter').on('input',function(){
	// 	console.log(runkeeper_tweets.filter(twt => (
	// 		twt.text.includes(input))))
	// })
	const populate_table = (twt_arr) => {
		$('.mytable tbody').html("");
		var html = '';
		for (const [i, twt] of twt_arr.entries()){
			html += `<tr><td>${i}</td><td>${twt.activityType}</td><td>${twt.text}</td></tr>`
		}
		$('.mytable').append(html);
	}

	populate_table([]);

	$('#textFilter').on('input', function(){
		clearTimeout(this.delay);
		if (this.value){
			this.delay = setTimeout(function(){
				const filtered = runkeeper_tweets.filter(twt => twt.text.includes(this.value));
				$('#searchCount').html(filtered.length)
				$('#searchText').html(this.value)
				populate_table(filtered);
			}.bind(this), 400)
			
		}
	})

	
// for(var i = 0; i < data.d.length; i++)
//             html += '<tr><td>' + data.d[i].FirstName + 
//                     '</td><td>' + data.d[i].Age + '</td></tr>';
// $('.mytable').first().after(html);

	// $('#textFilter').keypress(function (){
	// 	let _this = $(this); // copy of this object for further usage

    // 	setTimeout(function() {
	// 		let query = _this.val()
	// 		let twts = search_twt(query);
	// 		console.log(twts);
   	//  	}, 3000);
	// })
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	// function search_twt(input){
	// 	return runkeeper_tweets.filter(twt => (
	// 		twt.text.includes(input)
		// ))

	// var xTriggered=0;
	// $('#textFilter').keypress(function(event){
	// 	if (event.which == 13){
	// 		event.preventDefault();
	// 	}
	// 	xTriggered ++;
	// 	$.print(xTriggered)
	// 	// return runkeeper_tweets.filter(twt => (
	// 			// twt.writtenText.includes(input)))
	// })
	// $('#textFilter').keypress();
		// }
		// console.log(event);}
}
//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});