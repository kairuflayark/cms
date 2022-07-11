import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {

  constructor() { }
  @Input('contact') contact:Contact = new Contact(0,'','','','',[])
  @Output() selectedContactEvent:EventEmitter<Contact> = new EventEmitter();


  ngOnInit(): void {
  }

  onSelect(){
    this.selectedContactEvent.emit(this.contact)
  }

}
