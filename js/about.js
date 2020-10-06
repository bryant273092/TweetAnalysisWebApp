function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	//list of variables that will hold information about the tweets
	var first_date =tweet_array[0].time;
	var last_date = tweet_array[0].time;
	var completed_event = 0;
	var live_event= 0;
	var achievement =0;
	var miscellaneous=0;
	var written=0;
	//breaks down tweet information and updates variables accordingly
	for (var tweet of tweet_array){
		//counts the type of tweet by incrementing source variable
		eval(tweet.source + '++');
		//counts which tweets were written
		if (tweet.written){
			written++;
		//determines which is the first and last tweet based on time comparisons
		}
		if(tweet.time.getTime() < first_date.getTime()){
			first_date = tweet.time;
		}
		else if (tweet.time.getTime()> last_date.getTime()){
			last_date = tweet.time;
		}
	}
	console.log("first tweet: ", first_date, "last tweet: ",
	last_date," completed: ", completed_event,"live: ", live_event,"achieved: ", achievement,"other: ", miscellaneous, "written: ", written);
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	var date_format = {weekday: "long", month:"long", day: "numeric", year: "numeric"};
	$('#numberTweets').text(tweet_array.length);
	$('#firstDate').text(first_date.toLocaleDateString("en-US", date_format));
	$('#lastDate').text(last_date.toLocaleDateString("en-US", date_format));
	$('.completedEvents').text(completed_event);
	$('.completedEventsPct').text((completed_event/tweet_array.length).toFixed(2));
	$('.liveEvents').text(live_event);
	$('.liveEventsPct').text((live_event/tweet_array.length).toFixed(2));
	$('.achievements').text(achievement);
	$('.achievementsPct').text((achievement/tweet_array.length).toFixed(2));
	$('.miscellaneous').text(miscellaneous);
	$('.miscellaneousPct').text((miscellaneous/tweet_array.length).toFixed(2));
	$('.written').text(written)
	$('.writtenPct').text((written/tweet_array.length).toFixed(2));

	



	
}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});