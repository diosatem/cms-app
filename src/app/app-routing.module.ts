import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { ContactsComponent } from "./contacts/contacts.component";
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentsComponent } from "./documents/documents.component";
import { MessageListComponent } from "./messages/message-list/message-list.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/documents', pathMatch: 'full' },
    { path: 'documents', component: DocumentsComponent, children: [
        { path: 'detail', component: DocumentDetailComponent },
        { path: 'list', component: DocumentListComponent },
    ] },
    { path: 'messages', component: MessageListComponent },
    { path: 'contacts', component: ContactsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}