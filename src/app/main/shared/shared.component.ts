import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/service/register.service';
import { SocketConnectionService } from 'src/app/service/socket-connection.service';
import { Constant } from 'src/app/utils/constant';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {

  sharedArray :any =[];
  Title: any;
  Message: any;
  imagePathFull: string | Blob = ' ';
  constructor(private socketConnection : SocketConnectionService , private toaster : ToastrService , private client : RegisterService){}
  ngOnInit(): void {
    this.socketConnection.getSharedNotes();
    this.socketConnection.sharedNotes.subscribe((response)=>{
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

  getValueOfTitle(event: any) {
    this.Title = event.target.value
  }

  getValueOfMessage(event: any) {
    this.Message = event.target.value
  }

  editNote(Note: any) {
    let Title = Note.title;
    let Message = Note.text;
    if (this.Message) {
      Message = this.Message;

    }

    if (this.Title) {
      Title = this.Title

    }

    let URL: string | Blob = 'abc'
    let MessageType: number = Constant.Upload.message;
    let NoteId = Note.noteId

    if (this.imagePathFull) {
      MessageType = Constant.Upload.image;
      URL = this.imagePathFull;
    }
    this.socketConnection.editNote({ NoteId, Title, Message, MessageType, URL });
    this.socketConnection.EditNote.subscribe((response: any) => {

      console.log(response)
      if (response.isSuccess) {
        this.toaster.success('Note Edited SuccessFully', 'Success',
          {
            titleClass: "center",
            messageClass: "center"
          })

      }

      else {
        this.toaster.error(response.message, 'Error', {
          titleClass: "center",
          messageClass: "center"
        })
      }
    });
    this.socketConnection.getSharedNotes();
    this.socketConnection.sharedNotes.subscribe((response)=>{
      console.log(response)
      this.sharedArray = response;
    })
    Title = '';
    Message = '';
  }

  uploadImage(event: any) {
    let imagePath = event.target.files[0];

    let formdata = new FormData();
    formdata.append('file', imagePath);
    this.client.uploadImage(formdata).subscribe((response: any) => {
      this.imagePathFull = Constant.Url.IP + response.data;
      let URL: string | Blob = this.imagePathFull
      console.log(response);
    })

  }

}
