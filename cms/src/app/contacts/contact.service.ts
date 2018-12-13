import { Injectable} from '@angular/core';
import { contact } from './contact.model';
import { Subject } from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse, HttpRequest} from "@angular/common/http";


@Injectable()
export class ContactService {
  //contactSelectedEvent = new EventEmitter<Contact[]>();
  //contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<contact[]>();
  maxContactId: number;
  private contacts: contact[] = [];

  
  constructor(private http: HttpClient,) { 
   // this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();  }



    storeContacts(contacts: contact[]) {
      let stringToServer = JSON.stringify(this.contacts);
      let header = new HttpHeaders({
        "Content-Type":"application/json"
      });
      this.http.put('http://localhost:3000/contacts', stringToServer,{headers:header})
        .subscribe(result => {
          this.contactListChangedEvent.next(Object.assign(this.contacts));
        });
    }




    getContacts() {
      this.http.get<{message: String, contacts: contact[]}>('http://localhost:3000/contacts')
        .subscribe(
          //success function
          (contactsData) => {
            this.contacts = contactsData.contacts;
            console.log(this.contacts);
            this.maxContactId = this.getMaxId();
            this.contactListChangedEvent.next(this.contacts.slice())
          });
      //error function
      (error: any) => {
        console.log(error);
      }
      return this.contacts.slice();
    }

  getContact(id: string){
    return this.http.get<{message: String, contact: contact}>('http://localhost:3000/contacts/' + id);
  }

  deleteContact(contact: contact) {
    if (contact === null ) {
      return;
    }
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
    .subscribe(
      (response: Response) => {
        this.getContacts();
  // let pos = this.documents.indexOf(document);
  // if (pos < 0) {
  //   return;
  // }
  // this.documents.splice(pos, 1);
  //this.documentChangedEvent;
});





    
    // const pos = this.contacts.indexOf(contact);
    
    // if (pos < 0) {
    //   return;
    // }

    // this.contacts.splice(pos, 1);
    // //this.contactChangedEvent.emit(this.contacts.slice());
    // this.storeContacts(this.contacts);
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

    // this.maxContactId++;
    // newContact.id = String(this.maxContactId);
    // this.contacts.push(newContact);
    // //this.contactListChangedEvent.next(this.contacts.slice());
    // this.storeContacts(this.contacts);
  }

  updateContact(originalContact: contact, newContact: contact) {
    if (!originalContact || !newContact ){
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const strContact= JSON.stringify(newContact);

    this.http.patch('http://localhost:3000/contacts' + originalContact.id
      , strContact
      , { headers: headers })
      .subscribe(
        (contacts: contact[]) => {
          this.contacts = contacts;
          this.contactListChangedEvent.next(this.contacts.slice());
        });

    //  const pos = this.contacts.indexOf(originalContact);

    // if(pos < 0) {
    //   return;
    // }
   
    // newContact.id = originalContact.id;
    // this.contacts[pos]= newContact;
    // const contactListClone = this.contacts.slice();
    // //this.contactListChangedEvent.next(contactListClone);
    // this.storeContacts(this.contacts);

    // // console.log(this.contacts.indexOf(originalContact));
    // // console.log(originalContact);
    // // console.log(newContact);
    
    
  }

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts){
      const currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }


}