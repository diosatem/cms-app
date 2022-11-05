import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  private subscription: Subscription;

  constructor(private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documentsList: Document[]) => {
        this.documents = documentsList;
      }
    );
  }  

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
