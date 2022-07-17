import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy{



  documents: Document[] = []
  private dChangeSub!: Subscription


  constructor(private documentService:DocumentService) { }

  ngOnInit(): void {
    this.documentService.getDocuments()
    this.documentService.documentChangedEvent.subscribe( (documents:Document[]) => {this.documents = documents} )
    this.dChangeSub = this.documentService.documentListChangedEvent.subscribe(
      (documents: Document[])=>{
        this.documents = documents
      }
    )
  }

  ngOnDestroy(): void{
    this.dChangeSub.unsubscribe()
  }

}
