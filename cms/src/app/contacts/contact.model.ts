import { Injectable } from "@angular/core";

@Injectable()
export class contact{
    public id: string;
    public name: string;
    public email: string;
    public phone: string;
    public imageUrl: string;
    public group: contact[];

    constructor(id: string, name: string, email: string, phone: string, image: string, group: contact[] ){
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.imageUrl = image;
        this.group = group;
    }
}