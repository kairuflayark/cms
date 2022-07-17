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

  getDocuments(){
    this.http.get("https://jc-cms-790cd-default-rtdb.firebaseio.com/documents.json")
      .subscribe((data:any) =>{
        console.log(data);
        this.documents = []
        for (let item of data){
          let newDocument = new Document(item.id, item.name, item.description, item.url, item.children)
          this.documents.push(newDocument)
        }
        this.maxDocumentId = this.getMaxID()
        this.documents.sort((a,b) => a.name > b.name ? 1:b.name > a.name ? -1 : 0)
        this.documentListChangedEvent.next(this.documents.slice())
      },
      (error:any) => { console.log(error);
      })

  }

  storeDocuments(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }

      return this.http.put<Document[]>("https://jc-cms-790cd-default-rtdb.firebaseio.com/documents.json", 
        this.documents, httpOptions)
        .subscribe(() => this.documentListChangedEvent.next(this.documents.slice()))



  }

  getDocument(id:string):Document | undefined{
    console.log(id);
    
    return this.documents.find((document) =>  document.id === id)
  }

  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    this.storeDocuments()
 }

 addDocument(newDocument:Document){
  if (newDocument == null) {
    return
  }
  this.maxDocumentId++
  newDocument.id = String(this.maxDocumentId)
  this.documents.push(newDocument)

  this.storeDocuments()

 }
 getMaxID():number {
  let maxId = 0

  for (let document of this.documents){
    let currentId = Number(document.id)
    if (currentId > maxId){
      maxId = currentId
    }
  }
  return maxId
 }

 
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (newDocument == null || originalDocument == null) {
      return
    }
    let pos = this.documents.indexOf(originalDocument)
    if (pos < 0){
      return
    }

    newDocument.id = originalDocument.id
    this.documents[pos] = newDocument

    this.storeDocuments()

  }

}
