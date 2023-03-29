import { Component } from '@angular/core';
import { SocketConnectionService } from 'src/app/service/socket-connection.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent {

  trashArray : any =[]
  constructor( private socketConnection : SocketConnectionService ){
       this.socketConnection.getTrashNotes().then((response:any)=>{
        console.log(response);
        this.trashArray= response.data
       })
  }


}
