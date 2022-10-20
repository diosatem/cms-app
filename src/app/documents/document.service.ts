import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document-list/document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
documents: Document[];
documentSelectedEvent = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
   }

   getDocuments(): Document[] {
return this.documents.slice();
   }

   getDocument(id: string | number ): Document {
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
}
