import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})

export class ContactService {
  private contacts: Contact[] = [];
  private maxContactId: number;

  // contactSelectedEvent = new EventEmitter<Contact>();
  contactSelectedEvent: Subject<Contact> = new Subject();
  contactChangedEvent: Subject<Contact[]> = new Subject();
  contactListChangedEvent = new Subject<Contact[]>();

  constructor(private http: HttpClient) {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId()
  }

  getContacts(): any {
    // return this.contacts.slice();
    this.http
      .get('https://cms-app-4ba54-default-rtdb.firebaseio.com/contacts.json')
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );
          this.contactChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.log(error.message);
        }
      );
  }

  storeContacts() {
    let stringifyContacts = JSON.stringify(this.contacts);
    this.http
      .put(
        'https://cms-app-4ba54-default-rtdb.firebaseio.com/contacts.json',
        stringifyContacts,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
      )
      .subscribe(() => {
        this.contactChangedEvent.next(this.contacts.slice());
      });
  }

  getContact(id: string): Contact {    
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;

    this.contacts.forEach(element => {
      let currentId = +element.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    let contactListClone = this.contacts.slice();
    // this.contactChangedEvent.next(contactListClone);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let contactListClone = this.contacts.slice();
    // this.contactChangedEvent.next(contactListClone);
    this.storeContacts();
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
    // this.contactChangedEvent.next(this.contacts.slice());
    this.storeContacts();
  }
}

