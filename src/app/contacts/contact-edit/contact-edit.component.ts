import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  originalContact!: Contact;
  contact!: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id!: string;
  
  constructor(
       private contactService: ContactService,
       private router: Router,
       private route: ActivatedRoute) {
       }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params) => {
      this.id = params["id"]


      if (this.id == null){
        this.editMode = false;
        this.id = '0'
        return;
      }
      this.originalContact = this.contactService.getContact(this.id)!
      if (this.originalContact == null){
        return
      }
      this.editMode = true;
      this.contact = {...this.originalContact}
      if(this.contact.group?.length! > 0){
        this.groupContacts = JSON.parse(JSON.stringify(this.contact.group))
      }
    })
  }

  onSubmit(form: NgForm){
    let value = form.value
    let newContact = new Contact(this.id, value.name, value.email, value.phone, value.imageUrl, this.groupContacts)
    if (this.editMode === true){
      this.contactService.updateContact(this.originalContact, newContact)
    } else {
      this.contactService.addContact(newContact)
    }
    this.router.navigate(["/contacts"])

  }

  addToGroup(event: CdkDragDrop<string[]>){
    let selectedContact:Contact = event.item.data;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact){
       return;
    }
    this.groupContacts.push(selectedContact);
    
  }

  isInvalidContact(newContact:Contact):boolean {
    if (!newContact) {// newContact has no value
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
       return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++){
       if (newContact.id === this.groupContacts[i].id) {
         return true;
      }
    }
    return false;
  }
  
  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
       return;
    }
    this.groupContacts.splice(index, 1);
 }

  onCancel(){
    this.router.navigate(["/contacts"])
  }
}
