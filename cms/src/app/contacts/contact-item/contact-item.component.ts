import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { contact } from '../contact.model';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() contact: contact;

  constructor() { }

  ngOnInit() {
  }
}
