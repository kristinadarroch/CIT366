import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender = '5c099eb61c8c857638bbfea9';

   @ViewChild('subject') subjectRef: ElementRef;
   @ViewChild('msgText') msgTextRef: ElementRef;

   constructor(private messagesService: MessagesService) { }
  
  onSendMessage(){
    const subject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;
    const newMessage = new Message('', subject, msgText, this.currentSender);
    this.messagesService.addMessage(newMessage);
    this.onClear();
  }

  onClear(){
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }


  ngOnInit() {
  }
}
