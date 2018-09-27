export class contact{
    public contactId: number;
    public name: string;
    public email: string;
    public phone: number;
    public imageUrl: string;
    public group: ['value'];

    constructor(id: number, name: string, email: string, phone: number, image: string, group: ['value'] ){
        this.contactId = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.imageUrl = image;
        this.group = group;
    }
}