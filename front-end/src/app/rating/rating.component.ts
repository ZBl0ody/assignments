import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent {
  @Input() rating!: number;
  @Output() dataEvent: EventEmitter<string> = new EventEmitter();
  clipWidth: number = 0;
  ngOnChanges(): void {
    this.clipWidth = (this.rating * 76) / 10;
  }
  onDataPass() {
    this.dataEvent.emit(`your rating is ${this.rating}`);
  }
}
