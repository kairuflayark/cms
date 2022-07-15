import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  
  contacts: Contact[] = []
  maxContactId: number;

  constructor() { 
    this.contacts = MOCKCONTACTS
    this.maxContactId = this.getMaxID()
  }

  getContacts():Contact[] {
    return this.contacts
      .sort((a,b) => a.name > b.name ? 1:b.name > a.name ? -1 : 0)
      .slice()
  }

  getContact(id:string):Contact | undefined{
    return this.contacts.find((contact) =>  contact.id === id)
  }
    //how 
  deleteContact(contact:Contact) {
    if (!contact) {
        return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
        return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }
  addContact(newContact:Contact){
    if (newContact == null) {
      return
    }
    this.maxContactId++
    newContact.id = String(this.maxContactId)
    this.contacts.push(newContact)
    let contactsListClone = this.contacts.slice()
    this.contactListChangedEvent.next(contactsListClone)
  
   }
   getMaxID():number {
    let maxId = 0
  
    for (let contact of this.contacts){
      let currentId = Number(contact.id)
      if (currentId > maxId){
        maxId = currentId
      }
    }
    return maxId
   }
  
   
    updateContact(originalContact: Contact, newContact: Contact) {
      if (newContact == null || originalContact == null) {
        return
      }
      let pos = this.contacts.indexOf(originalContact)
      if (pos < 0){
        return
      }
  
      newContact.id = originalContact.id
      this.contacts[pos] = newContact
      let contactsListClone = this.contacts.slice()
      this.contactListChangedEvent.next(contactsListClone)
  
    }


}
