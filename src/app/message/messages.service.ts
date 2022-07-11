import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messages:Message[]
  
  constructor() {
    this.messages = MOCKMESSAGES
   }

    getMessages():Message[] {
    return this.messages
      // .sort((a,b) => a.name > b.name ? 1:b.name > a.name ? -1 : 0)
      .slice()
  }

  getMessage(id:string):Message | undefined{
    return this.messages.find((message) =>  message.id === id)
  }

  addMessage(message:Message){
    this.messages.push(message)
    console.log(this.messages);
    
    this.messageChangedEvent.emit(this.messages.slice())
  }

}
