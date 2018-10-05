export class contact{
    public contactId: number;
    public name: string;
    public email: string;
    public phone: string;
    public imageUrl: string;
    public group: ['value'];

    constructor(id: number, name: string, email: string, phone: string, image: string, group: ['value'] ){
        this.contactId = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.imageUrl = image;
        this.group = group;
    }
}