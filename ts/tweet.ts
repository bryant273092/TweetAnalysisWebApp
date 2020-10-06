class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //live_event
        if (this.text.includes('Watch'))
        {
            return "live_event";
        }
        //Achievement
        else if (this.text.includes('Achieved'))
        {
            return "achievement";

        }
        //Completed_event
        else if (this.text.includes('completed')|| this.text.includes ("Just posted"))
        {
            return "completed_event";
        }
        //Miscellaneous
        else {
            return "miscellaneous";
        }
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        //Checks wether tweet includes string, if it does
        //then users have not written
        
        if (this.text.includes('Check it out!')){
            return false;
        }
        else{
            
            return true;
        }
    }

    get writtenText():string {
        if(!this.written) {
            
            return "notwritten";
        }
        //TODO: parse the written text from the tweet
        var user_text = this.text
        
        if (user_text.includes("http")){
            user_text = user_text.split("http").shift()!;
        
        }
        if (user_text.includes("-")){
            user_text = user_text.split("-").pop()!;        
        }
        //console.log("typeof: ", typeof user_text);

        return user_text;
        
        
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        var user_text = this.text;
        if (user_text.includes(' mi ')){
            user_text = user_text.split(' mi ').pop()!.trim();
            user_text = user_text.split(' ').shift()!;
            return user_text;
        }
        else if ( user_text.includes('km')){
            user_text = user_text.split('km').pop()!.trim();
            user_text = user_text.split(' ').shift()!;
            return user_text;
        }
        else if (user_text.includes('posted')){
            if (user_text.includes(' an ')){
                user_text = user_text.slice(user_text.indexOf(" an ")+3);
            }
            else if(user_text.includes(' a ')){
                user_text = user_text.slice(user_text.indexOf(" a ")+2);
            }
            user_text = user_text.slice(0, user_text.indexOf(" in "));
            return user_text;
        }
        
        else{
            return 'unknown2';
        }
        
    }

    get distance():number {
        var regex_ptn = /\d+[.]\d+/
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        var user_text = this.text;
        if (user_text.includes(" mi ") && regex_ptn.test(user_text)){
            var distance = regex_ptn.exec(user_text);
            return Number(distance![0]);

        }
        else if (user_text.includes("km") && regex_ptn.test(user_text)){
            var distance = regex_ptn.exec(user_text);
            var converted = Number(distance![0]) * 0.621371;
            return converted;

        }
        else{
            return 0;
        }
        
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}