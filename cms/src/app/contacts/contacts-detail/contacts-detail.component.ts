import { Component, OnInit } from '@angular/core';
import { contact } from '../contact.model'
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  contacts: contact;
  constructor( private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        const id = params['id'];
        this.contacts = this.contactService.getContact(id);
      }
    )
  }

  onDelete(){
    this.contactService.deleteContact(this.contacts)
    this.router.navigate(['/contact'], { relativeTo: this.route })
  }

}
