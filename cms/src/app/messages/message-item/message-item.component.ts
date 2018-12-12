import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
   @Input() message: Message;
   messageSender: string;


  constructor(private contactService: ContactService, private messagesService: MessagesService) { }

  ngOnInit() {

    // TEMP:
    console.log(this.message);

  //  this.contactService.getContact(this.message.sender.id)
    // .subscribe(ContactData => {
      // this.messageSender = ContactData.contact.name;
    // })
  }
}
