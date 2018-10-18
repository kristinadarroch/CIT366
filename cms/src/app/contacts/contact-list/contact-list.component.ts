import { Component, OnInit } from '@angular/core';
// you must import the model!!
import { contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: contact[] = [];

  constructor(private contactService: ContactService) { 
    this.contacts = this.contactService.getContacts();
  }

  ngOnInit() {
    
  }

  onSelected(contact: contact[]){
    this.contactService.contactSelectedEvent.emit(contact);
  }
  

}
