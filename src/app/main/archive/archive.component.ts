import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SocketConnectionService } from 'src/app/service/socket-connection.service';
import { Constant } from 'src/app/utils/constant';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent {

  MessageType = Constant.Upload.image
  archieveArray : any =[]
  constructor(private socketConnection : SocketConnectionService , private toaster : ToastrService){
    this.socketConnection.getarchieveNotes().then((response:any)=>{
      console.log(response);

      this.archieveArray = response.data;
    })
  }

  unArchieve(id:string)
  {
    this.socketConnection.archieveNote(id,Constant.value.False);
    this.toaster.info('Moved out To archieve', 'Sucesss',
          {
            titleClass: "center",
            messageClass: "center"
          })
    this.socketConnection.getarchieveNotes().then((response:any)=>{
      console.log(response);

      this.archieveArray = response.data;
    })
  }

}
