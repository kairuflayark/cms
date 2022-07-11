import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [
    {
      id:1,
      subject:"test 1", 
      msgText:"test 1",
      sender:"Raul"
    },
    {
      id:1,
      subject:"test 2", 
      msgText:"test @",
      sender:"Ralph"
    },
    {
      id:1,
      subject:"test 3", 
      msgText:"test 3",
      sender:"R"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }
  onAddMessage(message: Message){
    this.messages.push(message)
  }

}
