import { Injectable } from '@angular/core';
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
    this.http.get<{message: String, contacts: contact[]}>('http://localhost:3000/contacts')
      .subscribe(
        (contactsData) => {
          this.contacts = contactsData.contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => (a.name > b.name) ? 1: ((b.name > a.name) ? -1: 0));
          this.contactListChangedEvent.next(this.contacts.slice());
        });
    (error: any) => {
      console.log(error);
    }
    return this.contacts.slice();
  }

  storeContacts(contacts: contact[]){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.put('http://localhost:3000/contacts', contacts, {headers: headers})
      .subscribe(
        (response: Response) => {
          this.contactListChangedEvent.next(contacts.slice())
        }
      );
  }

  getContact(id: string) {
   return this.http.get<{ message: string, contact: contact }>('http://localhost:3000/contacts/' + id);
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

    this.http.delete('http://localhost:3000/contacts/' + contact.id)
    .subscribe(
      (response: Response) => {
        this.getContacts();
    });

  }

  addContact(newContact: contact) {
    if(!newContact){
      return;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
   

    this.http.post<{message: String, contact: contact}>('http://localhost:3000/contacts', newContact, { headers: headers })
      .subscribe(
        (responseData) => {
          this.contacts.push(responseData.contact);
          this.contacts.sort((a,b) => (a.name > b.name ) ? 1 : ((b.name > a.name) ? -1 : 0));
          this.contactListChangedEvent.next(this.contacts.slice());
        });
  }

  updateContact(originalContact: contact, newContact: contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    console.log(originalContact.id);
    
    if (pos < 0) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const strDocument = JSON.stringify(newContact);

    this.http.patch('http://localhost:3000/contacts' + originalContact.id
      , strDocument
      , { headers: headers })
      .subscribe(
        (contacts: contact[]) => {
          this.contacts = contacts;
          this.contactListChangedEvent.next(this.contacts.slice());
        });
  }

}
