# ng-count-up-js

## refer
```
ng-countup is a rewritten version of https://github.com/inorganik/
```
## Install
```
npm i ng-count-up-js
```

## app.module.ts
```
import { CountUpModule } from 'ng-count-up-js';
..........
@NgModule({
..........
  imports: [
    CountUpModule,
    ..........
  ]
})
```

## component.html
```
<div appCountUp [startVal]="startVal" [endVal]="endVal" [duration]='2'></div>
<button (click)="startVal=endVal; endVal=300000"> 300000</button>
<button (click)="startVal=endVal; endVal=400000"> 400000</button>
<button (click)="startVal=endVal; endVal=500000"> 500000</button>
<button (click)="startVal=endVal; endVal=0"> 0</button>
</div>

```

## Parameters
### Input
- endVal: the number to count to
- duration: Optional duration of the animation in seconds. Default is 2.
- startVal: (Number) Optional start value for the count. Defaults to zero.
- decimals: Optional number of decimal places. Default is 2.

### Output
- complete

