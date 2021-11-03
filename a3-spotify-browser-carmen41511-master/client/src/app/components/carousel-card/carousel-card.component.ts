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
    console.log("card with", this.resource);
    if (this.resource.category === "artist"){
      this.url = `artist/${this.resource.id}`;
    }
    else if (this.resource.category === "album"){
      this.url =`album/${this.resource.id}`;
    }
    else{
      this.url = `track/${this.resource.id}`;
    }
  }

}
