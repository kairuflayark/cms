import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from 'src/app/documents/document.service';
import { WindRefService } from 'src/app/wind-ref.service';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  contact!:Contact 
  nativeWindow: any


  constructor(private route: ActivatedRoute, 
    private contactService:ContactService,
    private router: Router){ 
    }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
        console.log(params);
        
        //fix that undefined
        this.contact = this.contactService.getContact(params['id'])!
      }
    );
  }

  onDelete(){
    this.contactService.deleteContact(this.contact)
    this.router.navigate(['/contacts'])
  }

}
