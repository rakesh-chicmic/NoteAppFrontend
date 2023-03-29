import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketConnectionService } from 'src/app/service/socket-connection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit , OnDestroy {

  events: string[] = [];
  opened: boolean =false;
  Showbutton : Array<string> = [ 'trash' , 'notes' , 'archieve' ]
  selectedVal :string ='';
  constructor(private socketConnection : SocketConnectionService){}
  ngOnInit(): void {
    this.socketConnection.startConnection();
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
     this.selectedVal=event.target.value;
  }
}
