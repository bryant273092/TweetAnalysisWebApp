function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v4.0.0-beta.8.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": tweet_array
	  },
	  //TODO: Add mark and encoding
	  "mark": "bar",
	  "encoding": {
		"x": {  
			"field": "activityType", 
			"type": "nominal",
			"axis": { "title": "Activity" }
		},
		"y": { 
			"aggregate": "count",
			"type": "quantitative",
			"axis": {"title":"Frequency"}
		},
	
		}
	};
	
	var activity_dict ={} 
	var freq_first_pick = ["a key", 0];
	var freq_secnd_pick = ["a key", 0];
	var freq_third_pick = ["a key", 0];
	for(var tweet of tweet_array){
		var activityType = tweet.activityType;
		if (activityType in activity_dict){
			activity_dict[activityType].Frequency += 1;
			activity_dict[activityType].Distance += tweet.distance;
			activity_dict[activityType].Tweets.push(tweet)
			if (freq_first_pick[1] < activity_dict[activityType].Frequency){
				freq_first_pick[0] = activityType
				freq_first_pick[1] = activity_dict[activityType].Frequency
				freq_first_pick[2] = activity_dict[activityType].Distance
			}
			else if (freq_secnd_pick[1] < activity_dict[activityType].Frequency){
				freq_secnd_pick[0] = activityType
				freq_secnd_pick[1] = activity_dict[activityType].Frequency
				freq_secnd_pick[2] = activity_dict[activityType].Distance
			}
			else if (freq_third_pick[1] < activity_dict[activityType].Frequency){
				freq_third_pick[0] = activityType
				freq_third_pick[1] = activity_dict[activityType].Frequency
				freq_third_pick[2] = activity_dict[activityType].Distance
			}
		}
		else {
			activity_dict[activityType] = {Frequency: 1, Distance : tweet.distance, Tweets: [tweet]};
		}
	
	}

	//finds greatest and least distance activity
	var top_dist = [freq_first_pick[2],freq_secnd_pick[2],freq_third_pick[2]]
	var index = top_dist.indexOf(Math.max(freq_first_pick[2],freq_secnd_pick[2],freq_third_pick[2]))
	var first_pick = [freq_first_pick[0], freq_secnd_pick[0], freq_third_pick[0]][index]
	var index = top_dist.indexOf(Math.min(freq_first_pick[2],freq_secnd_pick[2],freq_third_pick[2]))
	var last_pick = [freq_first_pick[0], freq_secnd_pick[0], freq_third_pick[0]][index]
	//finds time of week longest activity is done most frequently
	var wknd_count = 0;
	var wkday_count = 0;
	var date_format = {weekday: 'long'}
	for (var tweet of activity_dict[first_pick].Tweets){
		if (tweet.time.toLocaleDateString("en-US", date_format) == 'Saturday'|| tweet.time.toLocaleDateString("en-US", date_format)== 'Sunday'){
			wknd_count++;
		}
		else{
			wkday_count++;
		}
	}
	var freq_time;
	if (wknd_count > wkday_count){
		freq_time = 'Weekends'
	}
	else{
		freq_time = 'Weekdays'
	}
	$('#numberActivities').text(Object.keys(activity_dict).length);
	$('#firstMost').text(freq_first_pick[0]);
	$('#secondMost').text(freq_secnd_pick[0]);
	$('#thirdMost').text(freq_third_pick[0]);
	$('#longestActivityType').text(first_pick);
	$('#shortestActivityType').text(last_pick);
	$('#weekdayOrWeekendLonger').text(freq_time);
	
	

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});
	
}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});