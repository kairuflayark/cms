import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    {
      id:1,  
      name:"test1", 
      description: "test1", 
      url:'123123', 
      children:[] 
    },
    {
      id:2,  
      name:"test2", 
      description: "test2", 
      url:'123123', 
      children:[] 
    },
    {
      id:3,  
      name:"test3", 
      description: "test3", 
      url:'123123', 
      children:[] 
    },
    {
      id:4,  
      name:"test4", 
      description: "test4", 
      url:'123123', 
      children:[] 
    },
    {
      id:5,  
      name:"test5", 
      description: "test5", 
      url:'123123', 
      children:[] 
    },
  ]


  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document)
  }

}
