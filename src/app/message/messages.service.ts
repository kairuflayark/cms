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

  sortAndSend(){

    this.messages.sort((a,b) => Number(a.id) > Number(b.id) ? 1:Number(b.id) > Number(a.id) ? -1 : 0)
    this.messageListChangedEvent.next(this.messages.slice())
  }

  getMessages(){

    this.http.get<{ message:string, messages:any}>("http://localhost:3000/messages")
      .subscribe((responseData) =>{
        this.messages = []
        for (let message of responseData.messages){
          console.log();
          
          this.messages.push(new Message(message.id, message.subject, message.msgText, message.sender.id))
        }

        this.sortAndSend()
      },
      (error:any) => { console.log(error);
      })

  }



  getMessage(id:string){
    return this.http.get<{ code:string, message:Message[]}>('http://localhost:3000/messages/' +id)
  }
    //how 


  deleteMessage(message:Message) {
    if (!message) {
        return;
    }
    const pos = this.messages.indexOf(message);
    if (pos < 0) {
        return;
    }
    this.http.delete('http://localhost:3000/messages/' +message.id)
      .subscribe(() => {
        this.messages.splice(pos, 1);
        this.sortAndSend()
      })


  }

  addMessage(newMessage:Message){
    if (newMessage == null) {
      return
    }

    const headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }
    newMessage.id = ''

    return this.http.post<{ code:string, message: Message}>("http://localhost:3000/messages/", 
    newMessage, headers)
    .subscribe((responseData) => { 
      this.messages.push(responseData.message)
      this.sortAndSend()
    })
  
  }
  
  updateMessage(originalMessage: Message, newMessage: Message) {
    if (newMessage == null || originalMessage == null) {
      return
    }
    let pos = this.messages.indexOf(originalMessage)
    if (pos < 0){
      return
    }

    newMessage.id = originalMessage.id

    const headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }

    this.http.put('http://localhost:3000/messages/' + originalMessage.id, newMessage, headers)
      .subscribe(
        () => {
          this.messages[pos] = newMessage;
          this.sortAndSend()
        }
      )

  }

        
}
