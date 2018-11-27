import { Component, OnInit } from '@angular/core';
import { contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { _localeFactory } from '@angular/core/src/application_module';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: contact = null;
  groupContacts: contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  invalidGroupContact: boolean;
  id: string;
  originalContact: contact;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          if (this.id === null) {
            this.editMode = false;
            return;
          }
          this.originalContact = this.contactService.getContact(this.id);
        
          if (!this.originalContact) {
            return;
          }

          this.editMode = true;
          this.contact = JSON.parse(JSON.stringify(this.originalContact));

          if (this.contact.group != null) {
            this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
            this.groupContacts = this.contact.group.slice();
          }
        }
      );
  }

  onSubmit(form: NgForm) {
    let newId = this.contactService.getMaxId();
    newId = newId++;
    let values = form.value;
    let newContact = new contact(newId.toString(), values['name'], values['email'], values['phone'], values['imageUrl'], this.groupContacts);
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contact']);
    }

  onCancel(){
    this.router.navigate(['/contact']);
  }

  isInvalidContact(newContact: contact) {
    if (!newContact) {
      return true;
    }
    if (newContact.id === this.contact.id) {
      return true;
    }

    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
      return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    let selectedContact: contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
    console.log('group contacts',this.groupContacts);
    console.log('selected contact',selectedContact); 
  }

  onRemoveItem(idx: number) {
    if (idx < 0 || idx >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }


}
