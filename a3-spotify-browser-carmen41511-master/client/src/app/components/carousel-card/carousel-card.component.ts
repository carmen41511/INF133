import { Component, OnInit, Input } from '@angular/core';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.css']
})
export class CarouselCardComponent implements OnInit {
  @Input() resource:ResourceData;
  url: string;

  constructor() { }

  ngOnInit() {
    console.log("card init wiht", this.resource);
    if (this.resource.category === "artist"){
      this.url = `artist/${this.resource.url}`;
    }
    else if (this.resource.category === "album"){
      this.url =`track/${this.resource.url}`;
    }
    else{
      this.url = `album/${this.resource.url}`;
    }
  }

}
