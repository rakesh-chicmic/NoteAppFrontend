import { Component } from '@angular/core';
import { SocketConnectionService } from 'src/app/service/socket-connection.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent {

  archieveArray : any =[]
  constructor(private socketConnection : SocketConnectionService){
    this.socketConnection.getarchieveNotes().then((response:any)=>{
      console.log(response);

      this.archieveArray = response.data;
    })
  }

  

}
