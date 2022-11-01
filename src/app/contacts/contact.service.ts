import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})

export class ContactService {
  contacts: Contact[];
  // contactSelectedEvent = new EventEmitter<Contact>();
  contactSelectedEvent: EventEmitter<Contact> = new EventEmitter();
  contactChangedEvent: EventEmitter<Contact[]> = new EventEmitter();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    // let contactEl: Contact;
    // this.contacts.forEach(item => {
    //   if (item.id === id) {
    //     contact = item;
    //   } else {
    //     return null;
    //   }
    // });
    // return contact;


    // for (const contact of this.contacts) {
    //   if (contact.id === id) {
    //     contactEl = contact;
    //   } else {
    //     return null;
    //   }
    // };
    // return contactEl;

    for (let i = 0; i < this.contacts.length; i++) {
      const element = this.contacts[i];
      if (element.id === id) {
        return element;
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }
}

