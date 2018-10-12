import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(1, 'Drake', 'The rapper', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Drake_at_the_Velvet_Underground_-_2017_%2835986086223%29_%28cropped%29.jpg/220px-Drake_at_the_Velvet_Underground_-_2017_%2835986086223%29_%28cropped%29.jpg'),
    new Document(2, 'Quavo', 'Member of migos','https://ksassets.timeincuk.net/wp/uploads/sites/55/2018/10/quavo-migos-GettyImages-1037749308.jpg'),
    new Document(3, 'Offset', 'Another member of migos', 'https://en.wikipedia.org/wiki/Offset_(rapper)'),
    new Document(4, 'TakeOff','The last member of migos' ,'https://en.wikipedia.org/wiki/Takeoff_(rapper)')
  ]
  constructor() { }

  ngOnInit() {
    console.log(this.documents);
  }

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
    console.log(this.documents);
    
  }

}
