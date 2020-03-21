import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TypedFlow';
  animate: boolean;
  constructor() {}

  stateChanged(event) {
    console.log(event);
    this.animate = event;
  }

}
