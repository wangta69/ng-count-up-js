import {
    Directive,
    ElementRef,
    Input,
    Output,
    HostListener,
    EventEmitter,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { CountUp } from './count-up';

@Directive({
  selector: '[appCountUp]'
})
export class CountUpDirective implements OnChanges {

  private countUp: any;
  private options: any;
  // Optional extra configuration, such as easing.
  // @Input('countUp') options: any;

  // Optional start value for the count. Defaults to zero.
  @Input() public startVal!: number;

  // the number to count to
  @Input() public endVal!: number;

  // Optional duration of the animation in seconds. Default is 2.
  @Input() public duration!: number;

  // Optional number of decimal places. Default is 2.
  @Input() public decimals!: number;

  @Input() public useGrouping!: boolean;

  // Optional flag for specifying whether the element should re-animate when clicked.
  // Default is true.
  // @Input() private reanimateOnClick: boolean;

  // on-complete event emitter
  @Output() private complete = new EventEmitter<void>();

  constructor(private el: ElementRef) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['endVal'] && typeof changes['endVal'].currentValue !== 'undefined') {

      this.countUp = this.createCountUp();
      this.animate();
    }
  }

  private createCountUp(): any {
    const startVal = this.startVal || 0;
    const duration = this.duration || 2;
    const decimals = this.decimals || 0;
    const useGrouping = typeof this.useGrouping === 'undefined' ? true : this.useGrouping; // 3,000 (true) vs 3000 (false)

    if (!this.duration) {
      this.duration = duration;
    }

    this.options = {
      startVal,
      duration,
      decimals,
      useGrouping
    };


    let countUp = new CountUp(this.el.nativeElement, this.endVal, this.options);
    return countUp;
  }

  private animate(): void {
    this.countUp.reset();
    this.countUp.start(() => this.countUp.update(this.endVal));
    setTimeout(() => {
        this.complete.emit();
    }, this.duration * 1000);
  }
}
