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
  private subscription: Subscription;
  contacts: contact[] = [];

  constructor(private contactService: ContactService) { 
    // this.contacts = this.contactService.getContacts();
  }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent
    .subscribe(
      (contactList: contact[]) => {
        this.contacts = contactList;
      }
    );
    console.log(this.contacts);
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
