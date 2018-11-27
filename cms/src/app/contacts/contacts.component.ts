import { Component, OnInit } from '@angular/core';
import { contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {
  // selectedContact: contact;
  
  constructor(private contactService: ContactService) { }

  ngOnInit() {
  //   this.contactService.contactSelectedEvent
  //     .subscribe(
  //       (contact: contact) => {
  //         this.selectedContact = contact;
  //       }
  //     )
  }
}
