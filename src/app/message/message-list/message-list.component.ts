import { Component, Input, OnInit } from '@angular/core';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = []

  constructor(private messageService:MessagesService,
    private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getContacts()
    this.messageService.getMessages()
    this.messageService.messageListChangedEvent.subscribe(messages => {
      this.messages = messages
    })

  }
  onAddMessage(message: Message){
    this.messages.push(message)
  }

}
