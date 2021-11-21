import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import{Router} from '@angular/router';
import{OvernightSleepData} from '../data/overnight-sleep-data';



@Component({
  selector: 'app-track-sleep',
  templateUrl: './track-sleep.page.html',
  styleUrls: ['./track-sleep.page.scss'],
})


export class TrackSleepPage  {

  constructor(private route: Router){}
  statPg(){
    this.route.navigate(['/stat-pg'])
  }
  elapsed: any = {
    h: '00',
    m: '00',
    s: '00'
  }
  progress:any = 0;
  overallProgress:any = 0;
  percent: number = 0;
  radius: number = 100;
  minutes: number = 1;
  seconds: any = 10;
  timer: any = false;
  overallTimer: any = false;
  state:'start' | 'stop' = 'stop';
  start_time: Date;
  stop_time: Date;
  date: OvernightSleepData;

  startTimer() {
    this.start_time = new Date();
    this.state = 'start';
    if(this.timer) {
      clearInterval(this.timer);
    } 
    if(!this.overallTimer) {
      this.progressTimer();
    }

      this.timer = false;
  }

  stopTimer() {
    this.stop_time = new Date();
    this.date = new OvernightSleepData(this.start_time,this.stop_time);
    // this.date.summaryString


    this.state = 'stop';
    this.elapsed={
      h:'11',
      m:'00',
      s:'05'
    }

    clearInterval(this.timer);
    clearInterval(this.overallTimer);
    this.overallTimer = false;
    this.timer = false;
    // this.elapsed = {
    //   h: '00',
    //   m: '00',
    //   s: '00'
    // }
  }

  progressTimer() {
    let countDownDate = new Date();

    this.overallTimer = setInterval(() => {
      let now = new Date().getTime();
      // Find the distance between now an the count down date
      var distance = now - countDownDate.getTime();

      // Time calculations for hours, minutes and seconds
      this.elapsed.h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.elapsed.m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.elapsed.s = Math.floor((distance % (1000 * 60)) / 1000);
      
      this.elapsed.h = this.pad(this.elapsed.h, 2);
      this.elapsed.m = this.pad(this.elapsed.m, 2);
      this.elapsed.s = this.pad(this.elapsed.s, 2);
    },1000)
  }

    pad(num, size) {
      let s = num+"";
      while (s.length < size) s = "0" + s;
      return s;
    }
  
}


  // time: BehaviorSubject<string> = new BehaviorSubject('00:00');
  // timer: any = false;
  // interval;
  // state:'start' | 'stop' = 'stop';

  // elapsed:any={
  //   h:'00',
  //   m:'00',
  //   s:'00'
  // }
  // overallTimer: any = false;

  // // constructor() { }

  // startTimer(){
  //   clearInterval(this.interval);
  //   this.state='start';
  //   setInterval(()=>{
  //     this.updateTimeValue();
  //   },1000);
  //   }

  // stopTimer(){
  //   this.time.next('00:00');
  //   this.state = 'stop';
  // }

  // updateTimeValue(){
  //   let countDownDate = new Date();

  //   this.overallTimer = setInterval(()=>{
  //       let now = new Date.getTime();
  //       let distance = now - countDownDate.getTime();

  //       this.elapsed.h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //       this.elapsed.m = Math.floor((distance % (1000 * 60 * 60 )) / (1000 * 60));
  //       this.elapsed.s = Math.floor((distance % (1000 * 60 )) / 1000);
  //   })
  // }


  // ngOnInit() {
  // }



// }
