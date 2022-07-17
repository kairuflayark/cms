import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messageListChangedEvent = new Subject<Message[]>();
  messages:Message[] = []
  maxMessageId = 0
  
  constructor( private http: HttpClient) { 
  }

  getMessages(){
    this.http.get("https://jc-cms-790cd-default-rtdb.firebaseio.com/messages.json")
      .subscribe((data:any) =>{
        console.log(data);
        this.messages = []
        for (let item of data){
          let newMessage = new Message(item.id, item.subject, item.msgText, item.sender)
          this.messages.push(newMessage)
        }
        this.maxMessageId = this.getMaxID()
        this.messages.sort((a,b) => a.id > b.id ? 1:b.id > a.id ? -1 : 0)
        this.messageListChangedEvent.next(this.messages.slice())
      },
      (error:any) => { console.log(error);
      })

  }

  storeMessages(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }

      return this.http.put<Message[]>("https://jc-cms-790cd-default-rtdb.firebaseio.com/messages.json", 
        this.messages, httpOptions)
        .subscribe(() => this.messageListChangedEvent.next(this.messages.slice()))



  }

  getMaxID():number {
    let maxId = 0
  
    for (let message of this.messages){
      let currentId = Number(message.id)
      if (currentId > maxId){
        maxId = currentId
      }
    }
    return maxId
   }
  getMessage(id:string):Message | undefined{
    return this.messages.find((message) =>  message.id === id)
  }

  addMessage(message:Message){
    message.id = String(this.maxMessageId++)
    this.messages.push(message)
    console.log(this.messages);
    
    this.storeMessages()
  }

}
