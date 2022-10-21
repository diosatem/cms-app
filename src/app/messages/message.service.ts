import { Injectable, EventEmitter } from '@angular/core';
import { ContactService } from 'app/contacts/contact.service';
import { Message } from './message-list/message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: Message[];
  messageChangedEvent = new EventEmitter<Message>();

  constructor(private contactService: ContactService) {
    this.messages = MOCKMESSAGES;
  }

  getMessages() {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    let message: Message;
    this.messages.forEach(item => {
      if (item.id === id) {
        message = item;
      } else {
        return null;
      }
    });
    return message;
  }

  addMessage(messages: Message[]) {
    this.messages.push(...messages);
    // this.messageChangedEvent.emit(this.messages.slice());
  }
}


