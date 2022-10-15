import { Injectable } from '@angular/core';
import { Contact } from './contact-list/contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    this.contacts.forEach(contact => {
      console.log(contact)
      if (contact.id === id) {
       
        return contact;
        
      } else {
        return null;
      }
    });
  }
}
