import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http'
import { Document } from './document.model';
import { Subject } from 'rxjs';

@Injectable()
export class DocumentsService {
  documentSelectedEvent = new EventEmitter<Document[]>();
  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private http: HttpClient) { 
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    this.http.get<Document[]>('https://kristinadarrochcms.firebaseio.com/documents.json')
      .subscribe(
        (documents: Document[]) => {
          console.log(documents);
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => (a.name > b.name) ? 1: ((b.name > a.name) ? -1: 0));
          this.documentListChangedEvent.next(this.documents.slice());
        });
    (error: any) => {
      console.log(error);
    }
    return this.documents.slice();
  }

  storeDocuments(documents: Document[]){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.put('https://kristinadarrochcms.firebaseio.com/documents.json', documents, {headers: headers})
      .subscribe(
        (response: Response) => {
          this.documentListChangedEvent.next(documents.slice())
        }
      );
  }


  getDocument(id: string): Document {
    for(let document of this.documents){
      if(document.id === id){
        return document
      }
    }
    return null;
  }

  deleteDocument(document: Document){
    if(document === null){
      return;
    }

    const pos = this.documents.indexOf(document);
      if(pos < 0){
        return;
      }
    this.documents.splice(pos, 1);
    // const documentsListClone = this.documents.slice();
    this.storeDocuments(this.documents);
  }

    getMaxId(): number{
      let maxId = 0;
      for (let document of this.documents){
        const currentId = +document.id;
        if (currentId > maxId) {
          maxId = currentId;
        }
      }
      return maxId;
    }

    addDocument(newDocument: Document){
      if(newDocument === null || newDocument === undefined){
        return
      } 
      this.maxDocumentId++ 
      newDocument.id = String(this.maxDocumentId);
      this.documents.push(newDocument);
      this.storeDocuments(this.documents);
    }

    updateDocument(originalDocument: Document, newDocument: Document){
      if(originalDocument === null || newDocument === undefined || newDocument === null || originalDocument === undefined){
        return
      }
      newDocument.id = originalDocument.id;
      const pos = this.documents.indexOf(originalDocument)
      if(pos < 0){
        return
      }
      this.documents[pos] = newDocument;
      this.storeDocuments(this.documents);
    }

}
