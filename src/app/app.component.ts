import { Component, OnInit } from '@angular/core';
import { RegisterService } from './service/register.service';
import { SocketConnectionService } from './service/socket-connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'keepApp';

  constructor(private socket : SocketConnectionService ){
  }


}
