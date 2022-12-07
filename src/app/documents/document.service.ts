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

          // this.maxDocumentId = this.getMaxId();
          this.documents.sort(
            (a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );
          this.documentChangedEvent.next([...this.documents]);
          // console.log(documents);
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

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<{ message: string; document: Document; id: string }>(
        'http://localhost:3000/documents',
        document,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        this.sortAndSend();
      });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }
}
