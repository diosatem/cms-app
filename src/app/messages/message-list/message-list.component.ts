import { Component, OnInit } from '@angular/core';
import { Message } from './message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(2, 'Welcome to CMS', 'We hope you will have a great experience with CMS.', 'CMS Team'),
    new Message(3, 'Need help?', 'Remember, we are just a click away!', 'CMS Support'),
    new Message(4, 'Hello from the CEO', 'Congratulations for choosing CMS', 'CMS CEO'),
    new Message(5, 'You did a great job today', 'We think you are doing just fine. Good job!', 'CMS Team')
];


  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
