import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnChanges {
  @ViewChild('slider', {static: false}) slider: ElementRef;
  @Input() data;
  @Input() height;
  maxHeight: number;
  currentHeight: number = 0;
  constructor(public render: Renderer2) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //wait for the data
    if (changes && changes.data.currentValue.length > 0) {
      //first item is already visible so we take 1 out of data length;
      this.maxHeight = (this.data.length - 1) * this.height;
      //add style to slider
      setTimeout(() => {
        this.render.setStyle(this.slider.nativeElement, 'transform', `translate3d(0px, ${this.currentHeight}vh, 0px)`);
        this.render.setStyle(this.slider.nativeElement, 'transition', 'all 0.25s ease 0s');
      }, 1000);
    }
  }

  slide(val: string) {
    if (val === 'up') {
      //we don't want to slide over first item
      if (this.currentHeight !== 0) {
        this.currentHeight += this.height;
        this.render.setStyle(this.slider.nativeElement, 'transform', `translate3d(0px, ${this.currentHeight}vh, 0px)`);
      }
    } else {
      //we dont want to slide over last item
      if (Math.abs(this.currentHeight) !== this.maxHeight) {
        this.currentHeight -= this.height;
        this.render.setStyle(this.slider.nativeElement, 'transform', `translate3d(0px, ${this.currentHeight}vh, 0px)`);
      }
    }
  }

}
