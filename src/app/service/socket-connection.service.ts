import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { Subject } from 'rxjs';
import { socketApi } from 'src/environment';

const authToken :any  = localStorage.getItem("token");
@Injectable({
  providedIn: 'root'
})
export class SocketConnectionService {

  constructor() { }

  public _hubConnection : signalR.HubConnection | any;

  responseNoteModel = new Subject;

  public startConnection()
  {
      
      this._hubConnection = new signalR.HubConnectionBuilder().withUrl(`${socketApi}`,
      { 
          skipNegotiation: true,
           transport: signalR.HttpTransportType.WebSockets,
          accessTokenFactory :()=> authToken

      }).withAutomaticReconnect().build();

      this._hubConnection.start().then(()=>{
          console.log("Connection started ");
         // this.refreshListenerTo();
      }).catch((error: any)=>{
          console.log(" Error While starting connection "+error);
      });
  }

  addNote(note : any)
  {
    return this._hubConnection.invoke('AddNote',note).then((response:any)=>{
      this.responseNoteModel.next(response.data)
    }).catch((error:Error)=>{
      console.log(error)
    })
  }

  addTimer(Id:string,Time: string)
  {
    return this._hubConnection.invoke('AddReminder',Id,Time).then((response:any)=>{
      console.log(response);
    })
  }

  getNotes()
  {
    return this._hubConnection.invoke('GetNotes',(response:any)=>{
    console.log(response);
    })
  }
}
