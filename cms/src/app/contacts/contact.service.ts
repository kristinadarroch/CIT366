import { Injectable, EventEmitter } from '@angular/core';
import { contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ContactService {
  contactListChangedEvent = new Subject<contact[]>();
  private contacts: contact[] = [];
  maxContactId: number;

  constructor(private http: HttpClient) { 
    this.maxContactId = this.getMaxId();
  }

  getContacts() {
    this.http.get<contact[]>('https://kristinadarrochcms.firebaseio.com/contacts.json')
      .subscribe(
        (contacts: contact[]) => {
          console.log(contacts, 'contacts in getContacts');
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => (a.name > b.name) ? 1: ((b.name > a.name) ? -1: 0));
          this.contactListChangedEvent.next(this.contacts.slice());
        });
    (error: any) => {
      console.log(error);
    }
  }

  storeContacts(contacts: contact[]){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.put('https://kristinadarrochcms.firebaseio.com/contacts.json', contacts, {headers: headers})
      .subscribe(
        (response: Response) => {
          this.contactListChangedEvent.next(contacts.slice())
        }
      );
  }

  getContact(id: string): contact {
    if(this.contacts.length > 0){
      for(let contact of this.contacts){
        if(contact.id === id){
          return contact
        }
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      let currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
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
    this.storeContacts(this.contacts);
  }

  addContact(newContact: contact) {
    if(!newContact){
      return;
    }

    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    this.storeContacts(this.contacts);
  }

  updateContact(originalContact: contact, newContact: contact) {
    if(!originalContact || !newContact ){
      return;
    }
    const pos = this.contacts.indexOf(originalContact);

    console.log(this.contacts.indexOf(originalContact));
    if(pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    const contactsListClone = this.contacts.slice();
    this.storeContacts(this.contacts);
  }

}
