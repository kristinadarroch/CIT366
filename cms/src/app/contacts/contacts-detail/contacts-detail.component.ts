import { Component, OnInit } from '@angular/core';
import { contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  contact: contact; 
  id: string;
  
  constructor(private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.contactService.getContact(this.id)
          .subscribe(
            (responseData) => {
              this.contact = responseData.contact;
            }
          );
      }
    );
  }

  onDelete() {
    this.contactService.deleteContact(this.contact)
    this.router.navigate(['/contacts'], {relativeTo: this.route});
  }

}