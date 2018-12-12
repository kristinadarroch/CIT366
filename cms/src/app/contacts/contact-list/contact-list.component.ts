import { Component, OnInit, OnDestroy } from '@angular/core';
// you must import the model!!
import { contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  subscription: Subscription;
  contacts: contact[] = [];
  term: string;

  constructor(private contactService: ContactService) { 
  }

  ngOnInit() {
    this.subscription = this.contactService.contactListChangedEvent
    .subscribe(
      (contactList: contact[]) => {
        this.contacts = contactList;
      }
    );
    this.contactService.getContacts();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onKeyPress(value: string){
    this.term = value;
  }

}
