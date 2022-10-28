import { Injectable, EventEmitter } from '@angular/core';
import { ContactService } from 'app/contacts/contact.service';
import { Message } from './message-list/message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[];
  // messageChangedEvent = new EventEmitter<Message>();
  messageChangedEvent: EventEmitter<Message[]> = new EventEmitter();

  constructor(private contactService: ContactService) {
    this.messages = MOCKMESSAGES;
  }

  getMessages() {
    return this.messages.slice();
  }

  // getMessage(id: string): Message {
  //   let message: Message;
  //   this.messages.forEach(item => {
  //     if (item.id === id) {
  //       message = item;
  //     } else {
  //       return null;
  //     }
  //   });
  //   return message;
  // }

  getMessage(id: string) {
    for (let i = 0; i < this.messages.length; i++) {
      const element = this.messages[i];
      if (element.id === id) {
        return element;
      }
    }
    return null;
  }

  addMessage(messages: Message) {
    this.messages.push(messages);
    this.messageChangedEvent.emit(this.messages.slice());
  }
}


