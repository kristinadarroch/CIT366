import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  public currentSender: string = 'Kristina Darroch';

   @ViewChild('subject') subjectRef: ElementRef;
   @ViewChild('msgText') msgTextRef: ElementRef;

   @Output() addMessageEvent = new EventEmitter<Message>();
  
  onSendMessage(){
    console.log('the subject');
    const subject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;
    const message = new Message(1, subject, msgText, this.currentSender);
    this.addMessageEvent.emit(message);
  }

  onClear(){
    console.log('cleared');
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }
  constructor() { }

  ngOnInit() {
  }
}
