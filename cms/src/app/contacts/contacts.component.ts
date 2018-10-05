import { Component, OnInit } from '@angular/core';
import { contact } from './contact.model';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  selectedContact: contact;
  constructor() { }

  ngOnInit() {
  }

}
