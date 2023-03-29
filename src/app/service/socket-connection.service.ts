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
  allNotes = new Subject;

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
        this.getNotes();
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
    // return this._hubConnection.invoke('GetNotes',(response:any)=>{
    // console.log(response);
    // })
     this._hubConnection.invoke("GetNotes").then((response:any)=>{
      this.allNotes.next(response.data);
      console.log(response);
    }).catch((error :any)=>{
          console.log(error)
    })
  }

  trashNote(id : string)
  {
      this._hubConnection.invoke("DeleteNote",id).then((response : any)=>{
        console.log(response);
      })
      this.getNotes();
  }

  getTrashNotes()
  {
     return this._hubConnection.invoke("GetTrashNote").catch((error:Error)=>{
      console.log(error)
     })
  }

  archieveNote(id : string)
  {
      this._hubConnection.invoke("ArchiveNote",id).then((response : any)=>{
        console.log(response);
      })
      this.getNotes();
  }

  getarchieveNotes()
  {
     return this._hubConnection.invoke("GetArchiveNote").catch((error:Error)=>{
      console.log(error)
     })
  }

  pinNote(id : string , Pin : number)
  {
    this._hubConnection.invoke('PinNotes',id , Pin).catch((error:Error)=>{
      console.log(error)
    })
    this.getNotes();
  }

  getPinnedNotes()    
  {
    return this._hubConnection.invoke('GetPinnedNotes').catch((error:Error)=>{
      console.log(error)
    })
  }
}
