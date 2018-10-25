import { Injectable, EventEmitter } from '@angular/core';
import { contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable()
export class ContactService {
  contactSelectedEvent = new EventEmitter<contact[]>();
  contactChangedEvent = new EventEmitter<contact[]>();
  contacts: contact[] = []

  constructor() { 
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): contact {
    for(let contact of this.contacts){
      if(contact.id === id){
        return contact
      }
    }
    return null;
  }

  deleteContact(contact: contact){
    if(contact === null){
      return;
    }

    const pos = this.contacts.indexOf(contact);
      if(pos < 0){
        return;
      }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice())
  }

}
