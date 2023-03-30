import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SocketConnectionService } from 'src/app/service/socket-connection.service';
import { Constant } from 'src/app/utils/constant';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent {

  trashArray : any =[]
  constructor( private socketConnection : SocketConnectionService , private toaster : ToastrService  ){
       this.socketConnection.getTrashNotes().then((response:any)=>{
        console.log(response);
        this.trashArray= response.data
       })
  }

  restrore(id: string)
  {
    this.socketConnection.trashNote(id , Constant.value.False);
    this.toaster.info('Note Restored', 'Sucesss',
    {
      titleClass: "center",
      messageClass: "center"
    })
    this.socketConnection.getTrashNotes().then((response:any)=>{
      console.log(response);
      this.trashArray= response.data
     })


  }

  delete(id : string)
  {
    this.socketConnection.deleteNotePermanantly(id).then((response : any)=>{
      console.log(response);
      if(response.isSuccess)
      {
        this.toaster.success('deleted SucessFully', 'Sucesss',
        {
          titleClass: "center",
          messageClass: "center"
        })
      }
    });
    this.socketConnection.getTrashNotes().then((response:any)=>{
      console.log(response);
      this.trashArray= response.data
     })

  }

}
