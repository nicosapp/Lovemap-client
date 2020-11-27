import { MessageService } from '@app/services/helpers/message.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  template: `<div *ngIf="messageService.messages.length">
    <h2>Messages</h2>
    <button class="clear" (click)="messageService.clear()">clear</button>
    <div *ngFor="let message of messageService.messages">{{ message }}</div>
  </div> `,
  styles: [``]
})
export class MessagesComponent implements OnInit {
  constructor(private messageService: MessageService) {}

  ngOnInit() {}
}
