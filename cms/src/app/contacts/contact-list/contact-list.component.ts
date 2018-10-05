import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// you must import the model!!
import { contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Output() selectedContactEvent = new EventEmitter<contact>();
  contacts: contact[] = [
    new contact(1, 'Bro. Jackson', 'jacksonk@byui.edu', '208-496-3771', 'https://web.byui.edu/Directory/Employee/jacksonk.jpg', null),
    new contact(2, 'Bro. Barzee', ' barzeer@byui.edu', '208-496-3768', 'https://web.byui.edu/Directory/Employee/barzeer.jpg', null)
  ];

  constructor() { }

  ngOnInit() {
  }

  onSelected(contact: contact){
    console.log('contact selected', contact);
    this.selectedContactEvent.emit(contact);
  }
  

}
