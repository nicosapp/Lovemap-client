import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar-container',
  template: `
    <ion-grid>
      <ion-row>
        <ion-col size="3">
          <ng-content select="[left]"></ng-content>
        </ion-col>
        <ion-col size="6" class="ion-justify-content-center">
          <ng-content select="[middle]"></ng-content>
        </ion-col>
        <ion-col size="3" class="ion-justify-content-end">
          <ng-content select="[right]"></ng-content>
        </ion-col>
      </ion-row>
    </ion-grid>
  `,
  styles: [``]
})
export class ToolbarContainerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
