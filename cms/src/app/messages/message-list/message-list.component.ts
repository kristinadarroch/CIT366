import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  subscription: Subscription;

  
  onAddMessage(message: Message){
    this.messages.push(message);
  }

  constructor( private messagesService: MessagesService) { 
    // this.messages = this.messagesService.getMessages();
  }

  ngOnInit() {
    this.messagesService.getMessages();
    this.subscription = this.messagesService.messageListChangedEvent
      .subscribe(
        (message: Message[]) => {
          this.messages = message;
        }
      )
  }

  ngOnDestroy(){
   this.subscription.unsubscribe();
  }

}
