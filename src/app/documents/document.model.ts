export class Document{
    constructor(public id:number, public name:string, description:string, url:string, children:Document[] ){}
}