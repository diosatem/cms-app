import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document-list/document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[];
  documentSelectedEvent = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS;   
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string | number): Document {
    console.log("Document service: " + this.documents)
    let document: Document;
    this.documents.forEach(document => {
      if (document.id === id) {
        document = document;
      } else {
        return null;
      }
    });
    return document;
  }

//   for (let i = 0; i < this.documents.length; i++) {
//     const element = this.documents[i];
//     if (element.id === id) {
//       return element;
//     }
//   }
//   return null;
// }
}
