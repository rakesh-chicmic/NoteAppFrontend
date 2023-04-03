import { Component, OnInit } from '@angular/core';
import { SocketConnectionService } from 'src/app/service/socket-connection.service';
import { Constant } from 'src/app/utils/constant';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {

  sharedArray :any =[];
  constructor(private socket : SocketConnectionService){}
  ngOnInit(): void {
    this.socket.getSharedNotes();
    this.socket.sharedNotes.subscribe((response)=>{
      this.sharedArray = response;
    })
  }
  MessageType :number=Constant.Upload.image;
  toggleCollapse(id: number) {
    if(this.sharedArray[id].isVisible)
    {
      this.sharedArray[id].isVisible=false;
    }
    else
    {
      this.sharedArray[id].isVisible=true;
    }
  }

}
