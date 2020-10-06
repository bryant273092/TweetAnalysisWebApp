var written_array = [];
function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	written_array = tweet_array.filter(tweet => tweet.written)
	
}
function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	$('#searchCount').text(0)
	$('#searchText').text('')
	$('#textFilter').on('input', function(){
		
		if (this.value != ''){
			var match_array = written_array.filter(tweet => tweet.writtenText.includes(this.value))
			var tweet_table = document.createElement('tbody')
			$('tbody').empty()
			$('#searchCount').text(match_array.length)
			$('#searchText').text(this.value)
			
			for(match of match_array){
				var table_row = document.createElement('tr')
				tc1 = document.createElement('th')
				tc2 = document.createElement('th')
				tc3 = document.createElement('th')
				
				//Number of tweet
				tc1.appendChild(document.createTextNode(match_array.indexOf(match)+1))
				tc2.appendChild(document.createTextNode(match.activityType))
				tc3.appendChild(document.createTextNode(match.text))
				var href = document.createElement('a')
				href.href = getHTML(match)
				var r_text = document.createTextNode(' URL')
				tc3.appendChild(href)
				href.appendChild(r_text)
				table_row.appendChild(tc1)
				table_row.appendChild(tc2)
				table_row.appendChild(tc3)
				tweet_table.appendChild(table_row)
			}
			$('tbody').replaceWith(tweet_table)
		}
		else{
			console.log('here')
			$('#searchCount').text(0)
			$('#searchText').text('')
			$('tbody').empty()
		}
	})
}
function getHTML(tweet){
	var user_text = tweet.text
	var regex_ptn = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
	if (regex_ptn.test(user_text)){
		var URL = regex_ptn.exec(user_text)
		return URL[0]; 
	}
	else{
		return 'google.com'
	}
	
	
}

//Wait for the DOM to load
$(document).ready(function() {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});