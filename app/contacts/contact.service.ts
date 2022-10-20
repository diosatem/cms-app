import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  getContact(sender: string): import("../../src/app/contacts/contact-list/contact.model").Contact {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
