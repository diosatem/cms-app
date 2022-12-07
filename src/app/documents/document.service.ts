import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

interface Response {
  message: string;
  documents: Document[];
}

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = [];
  private maxDocumentId: number;

  documentSelectedEvent = new Subject<Document>();
  documentChangedEvent = new Subject<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  storeDocuments() {
    let stringifyDocuments = JSON.stringify(this.documents);

    this.http
      .put(
        'https://cms-app-4ba54-default-rtdb.firebaseio.com/documents.json',
        stringifyDocuments,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
      )
      .subscribe(() => {
        this.documentChangedEvent.next(this.documents.slice());
      });
  }

  getDocuments(): any {
    // return this.documents.slice();
    this.http
      .get('http://localhost:3000/documents')
      .subscribe(
        (documents: Document[]) => {

          this.documents = documents;

          this.maxDocumentId = this.getMaxId();
          this.documents.sort(
            (a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );
          this.documentChangedEvent.next(this.documents.slice());
          console.log(documents);
        },
        (error: any) => {
          console.log(error.message);
        }
      );
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

  // addDocument(newDocument: Document) {
  //   if (!newDocument) {
  //     return;
  //   }
  //   this.maxDocumentId++;
  //   newDocument.id = this.maxDocumentId;
  //   this.documents.push(newDocument);
  //   let documentListClone = this.documents.slice();
  //   // this.documentChangedEvent.next(documentListClone);
  //   this.storeDocuments();
  // }

  addDocument(document: Document) {
    
    if (!document) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<{ message: string; document: Document; id: string }>(
        'http://localhost:3000/documents',
        document,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // document.id = responseData.id;
        this.documents.push(document);
        this.documentChangedEvent.next([...this.documents]);
      });
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
    // this.documentListChangedEvent.next(documentListClone);
    this.storeDocuments();
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
    // this.documentChangedEvent.next(documentListClone);
    this.storeDocuments();
  }
}
