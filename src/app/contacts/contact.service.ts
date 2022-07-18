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


  constructor(private http: HttpClient) { 
  }

  sortAndSend(){

    this.contacts.sort((a,b) => a.name > b.name ? 1:b.name > a.name ? -1 : 0)
    this.contactListChangedEvent.next(this.contacts.slice())
  }

  getContacts(){

    this.http.get<{ message:string, contacts:Contact[]}>("http://localhost:3000/contacts")
      .subscribe((responseData) =>{
        this.contacts = responseData.contacts
        this.sortAndSend()
      },
      (error:any) => { console.log(error);
      })

  }



  getContact(id:string){
    return this.http.get<{ message:string, contact:Contact}>('http://localhost:3000/contacts/' +id)
  }
    //how 


  deleteContact(contact:Contact) {
    if (!contact) {
        return;
    }
    const pos = this.contacts.findIndex(cont => {return cont.id == contact.id});
    if (pos < 0) {
        return;
    }
    this.http.delete('http://localhost:3000/contacts/' +contact.id)
      .subscribe(() => {
        this.contacts.splice(pos, 1);
        this.sortAndSend()
      })


  }

  addContact(newContact:Contact){
    if (newContact == null) {
      return
    }

    const headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }
    newContact.id = ''

    return this.http.post<{ message:string, contact: Contact}>("http://localhost:3000/contacts/", 
    newContact, headers)
      .subscribe((responseData) => { 
        this.contacts.push(responseData.contact)
        this.sortAndSend()
    })
  
  }
  
  updateContact(originalContact: Contact, newContact: Contact) {
    if (newContact == null || originalContact == null) {
      return
    }
    const pos = this.contacts.findIndex(cont => {return cont.id == originalContact.id});
    if (pos < 0){
      return
    }

    newContact.id = originalContact.id

    const headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }

    this.http.put('http://localhost:3000/contacts/' + originalContact.id, newContact, headers)
      .subscribe(
        () => {
          this.contacts[pos] = newContact;
          this.sortAndSend()
        }
      )

  }


}
