# ng-count-up-js

## refer
```
ng-countup is a rewritten version of https://github.com/inorganik/
```
## Installation
```
npm i ng-count-up-js
```

## How to use
```
<span (click)="amount=3000"><span appCountUp [endVal]="amount" [duration]='0.1' [useGrouping]="true"></span> click</span>

 [endVal]="display number"
 [duration]='0.1'
 [useGrouping]="true"  default: true, false: 3000, true: 3,000
 ```
### imports
```
```
#### app.module.ts
```
import { CountUpModule } from 'ng-count-up-js';
@NgModule({
  imports: [CountUpModule]
})
```
