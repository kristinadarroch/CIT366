import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  message: Message[] = [
    new Message(1, 'Homework', 'Hey can you help me with my homework tonight?', 'Nathan Thorne'),
    new Message(2, 'Missing Class Today', 'Hey I will not be able to make it to class I am sick', 'Brother Thayne'),
    new Message(3, 'Extra Credit', 'Hey my grade sucks can you help me out?', 'Kent Jackson')
  ]
  onAddMessage(message: Message){
    this.message.push(message);
  }

  constructor() { }

  ngOnInit() {
  }

}
