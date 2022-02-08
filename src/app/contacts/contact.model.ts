import { identifierName } from "@angular/compiler";

export class Contact {
    public id:string;
    public name:string
    public email:string
    public phone:string
    public group: string[];

    constructor(id:string,name:string, email:string, phone:string,
                    imageUrl:string, group:Array<string>) {
        this.id = id
        this.name = name
        this.email = email
        this.phone = imageUrl
        this.group = group
    }


}