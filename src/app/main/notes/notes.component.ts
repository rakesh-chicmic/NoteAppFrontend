import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/service/register.service';
import { SocketConnectionService } from 'src/app/service/socket-connection.service';
import { Constant } from 'src/app/utils/constant';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes: string = '';
  notesForm: FormGroup;
  clickCount: number = 0;
  notesArray: any = [];
  showDate: boolean = false;
  noteId: string = ''
  imagePathFull: Blob | string = ''
PinnedArray: any = [];
  constructor(private fb: FormBuilder, private socketConnection: SocketConnectionService, private client: RegisterService , private toaster : ToastrService) {
    this.socketConnection.allNotes.subscribe((response) => {
      console.log(response)
      this.notesArray = response
    })
    this.notesForm = this.fb.group({
      title: [''],
      notesMessage: ['', Validators.compose([Validators.required])]
    })

    // this.socketConnection.getPinnedNotes().subscribe((response:any)=>{
    //   this.PinnedArray = response.data;
    // })
  }
  ngOnInit(): void {
    this.socketConnection.getNotes()
    this.socketConnection.allNotes.subscribe((response) => {
      console.log(response)
      this.notesArray = response
    })
  }

  @HostListener('document:click')
  clickInside() {

  
    //   let Title: string = this.notesForm.value.title;
    //  let  Message = this.imagePathFull
    //   let MessageType: number = 2;
    //   this.socketConnection.addNote({ Title, Message, MessageType })
    //   this.socketConnection.responseNoteModel.subscribe((response) => {
    //     console.log(response);
    //     this.notesArray.push(response)
    //     console.log(this.notesArray)
    //   })
    // }
    if (this.notesForm.valid) {

      let Title: string = this.notesForm.value.title;
      let Message = this.notesForm.value.notesMessage;
      let URL:string = 'abc'
      let MessageType: number = 1
      this.clickCount++;
      if (this.clickCount === 1) {
          this.socketConnection.addNote({ Title, Message, MessageType , URL})
          this.socketConnection.responseNoteModel.subscribe((response) => {
            console.log(response);
            this.notesArray.push(response)
            console.log(this.notesArray)
          })
      }
      else {
          setTimeout(() => {
            this.clickCount = 0;
          }, 1000);
          return;
        }

        this.notesForm.reset();
      }
    }

    showDatePicker(id: string) {
      this.noteId = id
      this.showDate = true;
      let div = document.getElementsByClassName('modal')[0];
      div.classList.add('show')
    }
  public filterDateFrom: any;
  onDate(event: any): void {
    console.log(event.target.value)
    this.filterDateFrom = event.target.value;
  }

  createTimer() {
    alert(this.noteId);
    this.socketConnection.addTimer(this.noteId, this.filterDateFrom).then((response: any) => {
      console.log(response);
    })
  }

  pinNote(id : string) {

    this.socketConnection.pinNote(id,1)

  }

  unpin(id : string)
  {
    this.socketConnection.pinNote(id,0)
  }
  moveToTrash(id: string) {
    this.socketConnection.trashNote(id);
    this.toaster.warning('Moved To trash', 'Sucesss',
          {
            titleClass: "center",
            messageClass: "center"
          })
  }

  moveToArchieve(id: string) {
    this.socketConnection.archieveNote(id);
    this.toaster.warning('Moved To archieve', 'Sucesss',
          {
            titleClass: "center",
            messageClass: "center"
          })
  }

  uploadImage(event: any) {
    let imagePath = event.target.files[0];

    let Title: string = this.notesForm.value.title;
    let Message = this.notesForm.value.notesMessage;
    let MessageType: number = 2
    
    let formdata = new FormData();
    formdata.append('file', imagePath);
    this.client.uploadImage(formdata).subscribe((response : any) => {
      this.imagePathFull= Constant.Url.IP+response.data;
      let URL:string | Blob = this.imagePathFull
      console.log(response);
      this.socketConnection.addNote({Title,Message,MessageType ,URL})
      this.socketConnection.responseNoteModel.subscribe((response) => {
        console.log(response);
        this.notesArray.push(response)
        console.log(this.notesArray)
      })
    })

  }

  panelOpenState: boolean = false;

  toggle(expanded : any) {
    expanded = !expanded;
  }
}
