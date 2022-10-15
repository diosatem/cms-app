import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from './contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Output() selectedContactEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }

  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }
}
