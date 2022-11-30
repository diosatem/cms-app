import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[];
  private maxMessageId: number;
  // messageChangedEvent = new EventEmitter<Message>();
  selectedMessageEvent = new EventEmitter<Message>();
  messageChangedEvent: EventEmitter<Message[]> = new EventEmitter();

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
  }

  getMessages(): any {
    // return this.messages.slice();
    this.http
    .get('https://cms-app-4ba54-default-rtdb.firebaseio.com/documents.json')
    .subscribe(
      (messages: Message[]) => {

        this.messages = messages;

        this.maxMessageId = this.getMaxId();
        
        this.messageChangedEvent.next(this.messages.slice());
       
      },
      (error: any) => {
        console.log(error.message);
      }
    );

  }

  storeMessages() {
    let stringifyMessages = JSON.stringify(this.messages);

    this.http
      .put(
        'https://cms-app-4ba54-default-rtdb.firebaseio.com/documents.json',
        stringifyMessages,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
      )
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      });
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

  addMessage(message: Message) {
    this.messages.push(message);
    // this.messageChangedEvent.emit(this.messages.slice());
    this.storeMessages();
  }

  getMaxId(): number {
    let maxId = 0;

    this.messages.forEach(element => {
      let currentId = +element.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }
}


