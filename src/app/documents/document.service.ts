import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { Observable, Subject } from 'rxjs';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  documents:Document[] = []
  maxDocumentId: number = 0

  constructor( private http: HttpClient) { 
  }

  sortAndSend(){

    this.documents.sort((a,b) => a.name > b.name ? 1:b.name > a.name ? -1 : 0)
    this.documentListChangedEvent.next(this.documents.slice())
  }

  getDocuments(){

    this.http.get<{ message:string, documents:Document[]}>('http://localhost:3000/documents')
      .subscribe((responseData) =>{
        this.documents = responseData.documents
        this.sortAndSend()
      },
      (error:any) => { console.log(error);
      })

  }



  getDocument(id:string){
    return this.http.get<{ message:string, document:Document}>('http://localhost:3000/documents/' +id)
  }
    //how 


  deleteDocument(document:Document) {
    if (!document) {

      
        return;
    }

    
    const pos = this.documents.findIndex(doc => {return doc.id == document.id});
    if (pos < 0) {

        return;
    }
    this.http.delete('http://localhost:3000/documents/' +document.id)
      .subscribe(() => {
        this.documents.splice(pos, 1);
        this.sortAndSend()
      })


  }

  addDocument(newDocument:Document){
    if (newDocument == null) {
      return
    }

    const headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }
    newDocument.id = ''

    return this.http.post<{ message:string, document: Document}>("http://localhost:3000/documents/", 
    newDocument, headers)
    .subscribe((responseData) => { 
      this.documents.push(responseData.document)
      this.sortAndSend()
    })
  
  }
  
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (newDocument == null || originalDocument == null) {
      return
    }
    const pos = this.documents.findIndex(doc => {return doc.id == originalDocument.id});
    if (pos < 0){
      return
    }

    newDocument.id = originalDocument.id

    const headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }

    this.http.put('http://localhost:3000/documents/' + originalDocument.id, newDocument, headers)
      .subscribe(
        () => {
          this.documents[pos] = newDocument;
          this.sortAndSend()
        }
      )

  }

}
