import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Output() selectedContactEvent = new EventEmitter<Contact>();

  public contacts: Contact[] = []

  constructor(
    // private recipeService: RecipeService
    ) {
      this.contacts.push(new Contact(1, "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771", "../../assets/images/jacksonk.jpg", []))
      this.contacts.push(new Contact(2, "Rex Barzee", "barzeer@byui.edu", "208-496-3768", "../../assets/images/barzeer.jpg", []))
    }
  
  ngOnInit() {
    // this.recipes = this.recipeService.getRecipes();
  }

  onSelected(contact: Contact){
    this.selectedContactEvent.emit(contact)
    
  }

}
