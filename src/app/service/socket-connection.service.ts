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
  pinnedNotes = new Subject;
  alarmTriggeredSubject = new Subject;
  shareNoteSubject = new Subject;
  EditNote = new Subject;

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
          this.alarmTriggered()
          this.getPinnedNotes();
      }).catch((error: any)=>{
          console.log(" Error While starting connection "+error);
      });


      // this._hubConnection = new signalR.HubConnectionBuilder().withUrl("http://192.180.2.128.4242/blogHub",
      // { 
      //     skipNegotiation: true,
      //      transport: signalR.HttpTransportType.WebSockets,
      //      accessTokenFactory :()=> authToken

      // }).withAutomaticReconnect().build();

      
      //  this._hubConnection.start().then(()=>{
      //     console.log("Connection started ");

      //     this.getNotes();
      //     this.alarmTriggered()
      //     this.getPinnedNotes();
      // }).catch((error: any)=>{
      //     console.log(" Error While starting connection "+error);
      // });
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

  trashNote(id : string , IsTrashed : boolean)
  {
      this._hubConnection.invoke("TrashNote",id , IsTrashed).then((response : any)=>{
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

  archieveNote(id : string , IsArchived : boolean)
  {
      this._hubConnection.invoke("ArchiveNote",id ,IsArchived).then((response : any)=>{
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
    return this._hubConnection.invoke('GetPinnedNotes').then((response :any)=>{
      this.pinnedNotes.next(response.data);
      console.log(response)
    }).catch((error:Error)=>{
      console.log(error)
    })
  }

  alarmTriggered()
  {
     this._hubConnection.on('alarmTriggered',(response:any)=>{
      this.alarmTriggeredSubject.next(response)
        console.log(response)
      })
  }

  deleteNotePermanantly(id : string)
  {
    return this._hubConnection.invoke('DeleteNote',id ).catch((error:Error)=>{
      console.log(error);
    });
  }

  shareNote(id:string , ReceiverEmail : string)
  {
    this._hubConnection.invoke('ShareNote',id, ReceiverEmail).then((response :any)=>{
      this.shareNoteSubject.next(response)
      console.log(response);
    })

    this.getNotes()
  }

  editNote( Editeddata : any)
  {
    return this._hubConnection.invoke('EditNote',Editeddata).then((response:any)=>{
      console.log(response);
    })
  }
}
