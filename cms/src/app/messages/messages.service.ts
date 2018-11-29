import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ContactService } from '../contacts/contact.service';

@Injectable()
export class MessagesService {
  messageListChangedEvent = new EventEmitter<Message[]>();
  messages: Message[];
  maxMessageId: Number;

  constructor(private http: HttpClient, private contactService: ContactService) { 
    // this.messages = MOCKMESSAGES;
  }

  initMessages(){
    // this.http.get<Message[]>('https://kristinadarrochcms.firebaseio.com/messages.json')
    //   .subscribe(
    //     (contacts: Message[]) => {
    //       console.log(this.messages);
          // this.messages = messages;
          // this.maxMessageId = this.getMaxId();
          // this.messages.sort((a, b) => (a.name > b.name) ? 1: ((b.name > a.name) ? -1: 0));
          // this.messageChangeEvent.next(this.messages.slice());
    //     });
    // (error: any) => {
    //   console.log(error);
    // }
    // return this.messages.slice();
  }

  storeMessages(){
    this.messages = JSON.parse(JSON.stringify(this.messages));
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('https://kristinadarrochcms.firebaseio.com/messages.json', this.messages, { headers: header})
    .subscribe(
      (messages: Message[]) => {
        this.messageListChangedEvent.next(this.messages.slice());
      }
      );
  }

  getMessages(){
    this.http.get('https://kristinadarrochcms.firebaseio.com/messages.json')
    .subscribe(
      (messages: Message[]) => {
        console.log(messages);
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messageListChangedEvent.next(this.messages.slice());
      });
  (error: any) => {
    console.log(error);
    }
  }

  getMessage(id: string): Message {
    for(let message of this.messages){
      if(message.id === id){
        return message
      }
    }
    return null;
  }

  addMessage(message: Message){
    if (!message) {
      return;
    }
    this.messages.push(message);
    this.storeMessages();
  }

  getMaxId(): number{
    let maxId = 0;
    for (let message of this.messages) {
      let currentId = parseInt(message.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}
