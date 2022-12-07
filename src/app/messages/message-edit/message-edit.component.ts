import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../message.model';


@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})

export class MessageEditComponent implements OnInit {
  // currentSender: string = 'Diosa';  
  // @Output() addMessageEvent = new EventEmitter<Message>();
  @ViewChild('subject', { static: false }) subject: ElementRef;
  @ViewChild('msgText', { static: false }) msgText: ElementRef;
  @ViewChild('sender', { static: false }) sender: ElementRef;
  private messageId: string = '1';
  private currentSender = '1';

  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSendMessage() {
    console.log("Sent");
    const subj = this.subject.nativeElement.value;
    const msgTxt = this.msgText.nativeElement.value;
    // const num = '1';
    const currSender = this.currentSender;
    const newMsg = new Message(this.messageId, subj, msgTxt, this.currentSender);
    this.messageService.addMessage(newMsg);
    this.onClear();
  }

  onClear() {
    // let subj = this.subject.nativeElement.value;
    // let msgTxt = this.msgText.nativeElement.value;
    // subj = "";
    // msgTxt = "";
    // console.log("Cleared");
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}
