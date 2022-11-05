import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  private subscription: Subscription;

  constructor(private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe((contactsList: Contact[]) => {
      this.contacts = contactsList;
    });
  }

  onNewContact() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
