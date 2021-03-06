
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  document!:Document
  nativeWindow: any


  constructor(private route: ActivatedRoute, 
    private documentService:DocumentService,
    private router: Router,
    private windowService:WindRefService) {
       this.nativeWindow = windowService.getNativeWindow() }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
        console.log(params);
        
        //fix that undefined
        this.documentService.getDocument(params['id']).subscribe( res => this.document = res.document)
      }
    );
  }

  onView(){
    if(this.document.url){
      this.nativeWindow.open(this.document.url)
    }
  }

  onDelete(){
    this.documentService.deleteDocument(this.document)
    this.router.navigate(['/documents'])
  }

}
