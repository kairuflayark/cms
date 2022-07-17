import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {


  contacts: Contact[] = []
  term:string = ""
  private cChangeSub!: Subscription

  constructor(
    private contactService:ContactService
    ) {}
  
  ngOnInit() {
    this.contactService.getContacts()
    this.contactService.contactChangedEvent.subscribe( (contacts:Contact[]) => {this.contacts = contacts}
    )
    this.cChangeSub = this.contactService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => { this.contacts = contacts}
    ) 
  }
  ngOnDestroy():void {
    this.cChangeSub.unsubscribe()
  }


  onSelected(contact: Contact){

    this.contactService.contactSelectedEvent.emit(contact)
    
  }

  search(value:string){
    this.term = value
  }

}
