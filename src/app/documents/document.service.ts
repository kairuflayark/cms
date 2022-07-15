import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  documents:Document[]
  maxDocumentId: number;

  constructor() { 
    this.documents = MOCKDOCUMENTS
    this.maxDocumentId = this.getMaxID()
  }

  getDocuments():Document[] {
    return this.documents
      // .sort((a,b) => a.name > b.name ? 1:b.name > a.name ? -1 : 0)
      .slice()
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
    this.documentChangedEvent.emit(this.documents.slice());
 }

 addDocument(newDocument:Document){
  if (newDocument == null) {
    return
  }
  this.maxDocumentId++
  newDocument.id = String(this.maxDocumentId)
  this.documents.push(newDocument)
  let documentsListClone = this.documents.slice()
  this.documentListChangedEvent.next(documentsListClone)

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
    let documentsListClone = this.documents.slice()
    this.documentListChangedEvent.next(documentsListClone)

  }

}
