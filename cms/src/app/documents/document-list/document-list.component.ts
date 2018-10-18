import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents: Document[] = []
  constructor(private documentService: DocumentsService) {
    this.documents = this.documentService.getDocuments();
   }

  ngOnInit() {
    console.log(this.documents);
  }

  onSelectedDocument(document: Document[]){
    this.documentService.documentSelectedEvent.emit(document)
  }

}
