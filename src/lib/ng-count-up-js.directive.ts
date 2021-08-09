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
    @Input() private startVal: number;

    // the number to count to
    @Input() private endVal: number;

    // Optional duration of the animation in seconds. Default is 2.
    @Input() private duration: number;

    // Optional number of decimal places. Default is 2.
    @Input() private decimals: number;

    @Input() private useGrouping: boolean;

    // Optional flag for specifying whether the element should re-animate when clicked.
    // Default is true.
    // @Input() private reanimateOnClick: boolean;

    // on-complete event emitter
    @Output() private complete = new EventEmitter<void>();

    // Re-animate if preference is set.
    // @HostListener('click')
    // private onClick(): void {
    //     if (this.reanimateOnClick) {
    //         this.animate();
    //     }
    // }

    constructor(private el: ElementRef) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.endVal && typeof changes.endVal.currentValue !== 'undefined') {
            this.countUp = this.createCountUp();
            this.animate();
        }
    }

    private createCountUp(): any {
        const start = this.startVal || 0;
        const duration = this.duration || 2;
        const decimals = this.decimals || 0;
        const useGrouping = typeof this.useGrouping === 'undefined' ? true : this.useGrouping; // 3,000 (true) vs 3000 (false)

        if (!this.duration) {
            this.duration = duration;
        }

        this.options = {
            start,
            duration,
            decimals,
            useGrouping
        };

        // construct countUp

        let countUp = new CountUp(this.el.nativeElement, this.endVal, this.options);
        const diff = Math.abs(this.endVal - start);
        // make easing smoother for large numbers
        if (diff > 999) {
            const up = (this.endVal > start) ? -1 : 1;
            countUp = new CountUp(this.el.nativeElement, this.endVal + (up * 100), this.options);
        }

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
