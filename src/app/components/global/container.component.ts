import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  template:`
      <div class="container">
      <ng-content></ng-content>
    </div>
  `,
  styles:[`
    .container{ padding:8px; }
  `],
})
export class ContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
