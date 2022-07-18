import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';


@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  originalDocument!: Document;
  document!:Document;
  editMode:Boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) {

}

  ngOnInit(): void {
    this.route.params.subscribe((params:Params) =>{
      let id = params['id']
      if (id == null){
        this.editMode = false;
        return;
      }
      this.documentService.getDocument(params['id']).subscribe( res => {
        console.log(res);
        
        this.document = res.document
        console.log(this.document);
        
        console.log(this.originalDocument);
        
        if (this.document == null){
          return
        }
        this.editMode = true;
        this.originalDocument = {...this.document}
      })
      
    })
  }

  onSubmit(form: NgForm){
    let value = form.value
    let newDocument = new Document('0', value.name, value.description, value.url, [])
    console.log(this.editMode);
    
    if (this.editMode === true){
      this.documentService.updateDocument(this.originalDocument, newDocument)
    } else {
      this.documentService.addDocument(newDocument)
    }
    this.router.navigate(["/documents"])

  }

  onCancel(){
    this.router.navigate(["/documents"])
  }

}
