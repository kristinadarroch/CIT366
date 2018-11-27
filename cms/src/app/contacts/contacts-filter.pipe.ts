import { Pipe, PipeTransform } from '@angular/core';
import { contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: contact[], term: string){
    let filteredArray: contact[] = [];

    if(term && term.length > 0){
      filteredArray = contacts.filter(
        (contact: any) => contact.name.toLowerCase().includes(term.toLowerCase())
      );
    };

    if(filteredArray.length > 0){
      return filteredArray;
    }
    return contacts;
  }

}
