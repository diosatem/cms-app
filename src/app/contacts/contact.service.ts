import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact-list/contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    let contact: Contact;
    this.contacts.forEach(item => {
      if (item.id === id) {
        contact = item;
      } else {
        return null;
      }
    });
    return contact;
  }
}
