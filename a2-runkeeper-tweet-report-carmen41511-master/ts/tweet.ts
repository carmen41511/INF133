class Tweet {
	text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        if (this.text.includes('Live')){
            return "live_event"
        }
        else if (this.text.includes('achieved') || this.text.includes('Achieved') || this.text.includes('ACHIEVED')){
            return "achievement"
        }
        else if (this.text.includes('completed') || this.text.includes('posted')){
            return "completed_event"
        }
        else{
            return "miscellaneous";
        }
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        if (this.text.includes("@Runkeeper") || this.text.includes("TomTom")){
            return false;
        }
        else{
            return true;
        }
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        else{
            var written_str = this.text.slice(0,this.text.lastIndexOf("https"));
            written_str = written_str.substring(written_str.lastIndexOf("-")+1);
        }
        return written_str.trim();
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        else{
            if (this.text.includes("with @R")){
                let front = this.text.substring(this.text.lastIndexOf("with"))
                let back = this.text.slice(0, this.text.indexOf("a")+1)
                let activity = this.text.replace(front,"")
                activity = activity.replace(back,"")
                let re = new RegExp(/\d+(\.\d{1,2})?.?[a-z]{2}/g)
                let yoga_re = new RegExp(/[0-9]:?/g)
                activity = activity.replace(re,'')
                activity = activity.replace(yoga_re,'')
                if (activity.includes('in ')){
                    activity = activity.replace('in ','').trim()
                }
                if (activity.includes('-')){
                    activity = activity.substring(this.text.indexOf("-"))
                }
                return activity.trim();
            }
            else if (this.text.includes("-")){
                let front = this.text.slice(0,this.text.indexOf('a')+1)
                let back = this.text.substring(this.text.indexOf("-"))
                let activity = this.text.replace(front,"")
                activity = activity.replace(back,"")
                let re = new RegExp(/\d+(\.\d{1,2})?.?[a-z]{2}/g)
                let yoga_re = new RegExp(/[0-9]:?/g)
                activity = activity.replace(re,'')
                activity = activity.replace(yoga_re,'')
                if (activity.includes('in ')){
                    activity = activity.replace('in ','').trim()
                }
                if (activity.includes('-')){
                    activity = activity.substring(this.text.indexOf("-"))
                }
                return activity.trim();
            }
           return "unknown";
        }
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        else{
            let reg = /\d+(\.\d{1,2})/g;
            let str_distance = this.text.match(reg);
            let num_distance = Number(str_distance);
            if (this.text.includes('mi')){
                return num_distance;
            }
            else if (this.text.includes('km')){
                num_distance = Number((num_distance/1.609).toFixed(2));
                return num_distance;
            }
            return 0;
        }
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}