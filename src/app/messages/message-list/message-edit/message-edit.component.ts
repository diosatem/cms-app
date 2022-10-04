import { Component, ElementRef, EventEmitter, OnInit, ViewChild, Output } from '@angular/core';
import { Message } from '../message.model';


@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})

export class MessageEditComponent implements OnInit {
  currentSender: string = 'Diosa';
  // @ViewChild('id', {static: false}) idRef: ElementRef;
  @ViewChild('subject', { static: false }) subject: ElementRef;
  @ViewChild('msgText', { static: false }) msgText: ElementRef;
  @ViewChild('sender', { static: false }) sender: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage() {
    const subj = this.subject.nativeElement.value;
    const msgTxt = this.msgText.nativeElement.value;
    const num = 1;
    const currSender = this.currentSender; 
    const newMsg = new Message(num, subj, msgTxt, currSender);
    console.log('Send')
    this.addMessageEvent.emit(newMsg);
  }

  onClear() {
    // let subj = this.subjectRef.nativeElement.value;
    // let msgTxt = this.msgTextRef.nativeElement.value;

    console.log("Cleared")
  }
}
