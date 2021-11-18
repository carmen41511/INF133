import { OverlayBaseController } from '@ionic/angular/util/overlay';
import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
	private sleepStart:Date;
	private sleepEnd:Date;
	constructor(sleepStart:Date, sleepEnd:Date) {
		super();
		this.sleepStart = sleepStart;
		this.sleepEnd = sleepEnd;
	}

	summaryString():string {
		var sleepStart_ms = this.sleepStart.getTime();
		var sleepEnd_ms = this.sleepEnd.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;
		    
		// Convert to hours and minutes
		return Math.floor(difference_ms / (1000*60*60)) + " hours, " + Math.floor(difference_ms / (1000*60) % 60) + " minutes" ;
	}

	dateString():string {
		return "Night of " + this.sleepStart.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}
}


// addEventListener(onclick=（） =》{
// 	if click first time:
// 	// 2021/11/17/4pm
// 	time = now();
// 	if click second time:
// 	// 2021/11/18/1pm
// 	cur = now()
// 	let overslopeedata = new OvernightSleepData(time, cur);
// 	overslopeedata.summarystring()
// })