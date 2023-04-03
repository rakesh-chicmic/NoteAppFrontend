import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SocketConnectionService } from 'src/app/service/socket-connection.service';
import { Constant } from 'src/app/utils/constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit , OnDestroy {

  events: string[] = [];
  opened: boolean =false;
  Showbutton : Array<string> = Constant.ButtonArray;
  selectedValOfButton :string ='';
  remainderNote : any =[]
  showRemainderNote = false
  constructor(private socketConnection : SocketConnectionService , private toaster : ToastrService){
    this.socketConnection.startConnection();
    this.socketConnection.alarmTriggeredSubject.subscribe((response : any)=>{
      if(response.isSuccess)
      {
       this.remainderNote.push(response.data)
         this.toaster.warning("You Have a Note Remainder ","Remainder",{
            titleClass: "center",
            messageClass: "center"

         })

         setTimeout(() => {
           this.showRemainderNote = true
         }, 5000);
      }
    })
  }
    ngOnInit() {
      
  }

  close() {
    let element = document.getElementsByClassName('offcanvas')[0];
    element.classList.remove('show');
  }

  ngOnDestroy(): void {
    this.socketConnection._hubConnection?.off("recieveMessage")
  }

  showComponent(event: any)
  {
     console.log(event.target.value)
     this.selectedValOfButton=event.target.value;
  }
}
