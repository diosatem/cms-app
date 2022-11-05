import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[];
  documentSelectedEvent = new Subject<Document>();
  documentChangedEvent = new Subject<Document[]>();

  documentListChangedEvent = new Subject<Document[]>();
  private maxDocumentId: number;


  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string | number): Document {
    console.log("Document service: " + this.documents)
    let document: Document;
    this.documents.forEach(element => {
      if (element.id === id) {
        document = element;
      }
    });
    return document;
  }

  getMaxId(): number {
    let maxId = 0;

    this.documents.forEach(element => {
      let currentId = +element.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId;
    this.documents.push(newDocument);
    let documentListClone = this.documents.slice();
    this.documentChangedEvent.next(documentListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let documentListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentListClone);
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    // this.documentChangedEvent.emit(this.documents.slice());
    let documentListClone = this.documents.slice();
    this.documentChangedEvent.next(documentListClone);
  }

}
