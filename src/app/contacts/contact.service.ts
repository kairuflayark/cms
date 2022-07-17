import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  maxContactId: number = 0;

  constructor(private http: HttpClient) { 
  }

  getContacts(){

    this.http.get("https://jc-cms-790cd-default-rtdb.firebaseio.com/contacts.json")
      .subscribe((data:any) =>{
        console.log(data);
        this.contacts = []
        for (let item of data){
          let newContact = new Contact(item.id, item.name, item.email, item.phone, item.imageUrl, item.group)
          this.contacts.push(newContact)
        }
        this.maxContactId = this.getMaxID()
        this.contacts.sort((a,b) => a.name > b.name ? 1:b.name > a.name ? -1 : 0)
        this.contactListChangedEvent.next(this.contacts.slice())
      },
      (error:any) => { console.log(error);
      })

  }

  storeContacts(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }

      return this.http.put<Contact[]>("https://jc-cms-790cd-default-rtdb.firebaseio.com/contacts.json", 
        this.contacts, httpOptions)
        .subscribe(() => this.contactListChangedEvent.next(this.contacts.slice()))



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
    this.storeContacts()
  }
  addContact(newContact:Contact){
    if (newContact == null) {
      return
    }
    this.maxContactId++
    newContact.id = String(this.maxContactId)
    this.contacts.push(newContact)
   
    this.storeContacts()
  
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
  
      this.storeContacts()
  
    }


}
