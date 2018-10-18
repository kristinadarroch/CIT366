import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { contact } from 'src/app/contacts/contact.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
   @Input() message: Message;
   messageSender: string = "";
   canEdit: boolean = false;
  constructor(private contactService: ContactService, private messagesService: MessagesService) { }

  ngOnInit() {
    let contact: contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact.name;
  }
}
