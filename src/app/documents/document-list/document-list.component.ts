import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from './document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
@Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(1, 'CIT 260 - Object Oriented Programming', 'In this course you will learn Object Oriented Programming and the Java programming language by designing and creating a simple game.', 'https://content.byui.edu/file/22c0260d-e1b7-43a2-8903-8d8f948041ee/4/syllabus.html', []),
    new Document(2, 'CIT 241 - Network Design', 'This course focuses on initial router configuration, Cisco IOS Software management, routing protocol configuration, TCP/IP, and access control lists (ACLs). Students will develop skills on configuring a router, managing Cisco IOS Software, configuring routing protocol on routers, and setting the access lists to control the access to routers.', 'https://content.byui.edu/file/0bdf2615-8d6d-4549-b533-0c75aa4baae2/9/CIT241Syllabus.html', []),
    new Document(3, 'CIT 262 - Systems Analysis and Design', 'This course teaches the concepts of systems analysis and design for those desiring to work in the field of information technology. Initially, an overview of an information system and the software development life cycle (SDLC) processes are covered.', 'https://content.byui.edu/file/926f3050-2f1a-4354-a1f1-66821e3a013e/14/cit262syllabus.html', []),
    new Document(4, 'CIT 352 - Operating Systems I', 'This course covers basic network operating system principles and Linux commands. At the conclusion of this course, students should understand how to install, configure, and maintain the Linux operating system and general operating system concepts.', 'https://content.byui.edu/file/3864abbb-7921-435a-8ec9-0ea0a46f64ad/5/Course%20Name%20-%20Syllabus.html', [])
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
