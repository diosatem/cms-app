import { Component, Input, OnInit } from '@angular/core';
import { ContactService } from 'app/contacts/contact.service';
import { Contact } from 'src/app/contacts/contact-list/contact.model';
import { Message } from '../message.model';


@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    const contact: Contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact?.name;
  }

}
