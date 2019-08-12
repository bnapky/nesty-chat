import { Component, OnInit, Input } from '@angular/core';
import { MessagePayload } from '../../../../../src/chat/message-payload';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input()
  message: MessagePayload;

  constructor() { }

  ngOnInit() {
  }

}
