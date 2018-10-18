import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = []
  onAddMessage(message: Message){
    this.messages.push(message);
  }

  constructor( private messagesService: MessagesService) { 
    this.messages = this.messagesService.getMessages();
  }

  ngOnInit() {
    this.messages = this.messagesService.getMessages();
    this.messagesService.messageChangeEvent
      .subscribe(
        (message: Message[]) => {
          this.messages = message;
        }
      )
  }

}
