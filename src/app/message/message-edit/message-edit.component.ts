import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subjectInput', {static: false}) subjectInputRef!: ElementRef;
  @ViewChild('messageInput', {static: false}) MessageInputRef!: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>(); 
  
  
  subject:string = ''
  msgText:string = ''
  currentSender:string = "James Call"


  constructor(private messageService:MessagesService) { }

  ngOnInit(): void {
  }

  onSendMessage(){
    this.subject = this.subjectInputRef.nativeElement.value
    this.msgText = this.MessageInputRef.nativeElement.value
    let message = new Message('0', this.subject, this.msgText, this.currentSender)
    this.messageService.addMessage(message)
  }
  onClear(){
    this.subject = ''
    this.subjectInputRef.nativeElement.value = ''
    this.msgText = ''
    this.MessageInputRef.nativeElement.value = ''
  }

}
