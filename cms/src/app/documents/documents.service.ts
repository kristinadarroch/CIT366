import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
//import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse, HttpRequest} from "@angular/common/http";
import 'rxjs';

@Injectable()
export class DocumentsService {
  documentSelectedEvent = new EventEmitter<Document[]>();
  //documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;
  documents: Document[] = [];
 


  constructor(private http: HttpClient) { 
    this.maxDocumentId = this.getMaxId();
    
  }

  storeDocuments(documents: Document[]) {
    const headers = new HttpHeaders ({'Content-Type': 'application/json'});
    
    this.http.put('http://localhost:3000/documents', documents, {headers: headers})
    .subscribe(
      (response: Response) => {
        this.documentListChangedEvent.next(documents.slice())
      }
    )
  }


  getDocuments(): Document[] {
    this.http.get<{message: String, documents: Document[]}>('http://localhost:3000/documents')
      .subscribe(
        //success function
        (documentData) => {
          this.documents = documentData.documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a,b) => (a.name > b.name ) ? 1 : ((b.name > a.name) ? -1 : 0));
          this.documentListChangedEvent.next(this.documents.slice())
        });
    //error function
    (error: any) => {
      console.log(error);
    }
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for(let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if (document === null || document === undefined) {
      return;
    }

    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.getDocuments();
  });

  }

  
  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents){
      const currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }


  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
   

    this.http.post<{message: String, document: Document}>('http://localhost:3000/documents', newDocument, { headers: headers })
      .subscribe(
        (responseData) => {
          this.documents.push(responseData.document);
          this.documents.sort((a,b) => (a.name > b.name ) ? 1 : ((b.name > a.name) ? -1 : 0));
          this.documentListChangedEvent.next(this.documents.slice());
        });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const strDocument = JSON.stringify(newDocument);

    this.http.patch('http://localhost:3000/documents' + originalDocument.id
      , strDocument
      , { headers: headers })
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documentListChangedEvent.next(this.documents.slice());
        });
  }

}