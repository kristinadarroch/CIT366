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

  constructor(private http: HttpClient, private contactService: ContactService) { }

  storeMessages(){
    this.messages = JSON.parse(JSON.stringify(this.messages));
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('http://localhost:3000/messages', this.messages, { headers: header})
    .subscribe(
      (messages: Message[]) => {
        this.messageListChangedEvent.next(this.messages.slice());
        }
      );
  }

  getMessages(){
    this.http.get<{message: String, messages: Message[]}>('http://localhost:3000/messages')
    .subscribe(
      (messagesData) => {
        this.messages = messagesData.messages;
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

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
   
    this.http.post<{message: String, messages: Message}>('http://localhost:3000/messages', message, { headers: headers })
      .subscribe(
        (responseData) => {
          this.messages.push(responseData.messages);
          this.messageListChangedEvent.next(this.messages.slice());
        });
    // this.messages.push(message);
    // this.storeMessages();
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
