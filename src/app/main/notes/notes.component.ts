import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
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

  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
  notes: string = '';
  notesForm: FormGroup;
  clickCount: number = 0;
  notesArray: any = [];
  showDate: boolean = false;
  noteId: string = ''
  imagePathFull: Blob | string = ''
  PinnedArray: any = [];
  isEmojiPickerVisible: boolean = false;
  validateTimer: boolean = false;
  EditNoteForm : FormGroup;
  constructor(private fb: FormBuilder, private socketConnection: SocketConnectionService, private client: RegisterService, private toaster: ToastrService) {
    this.socketConnection.getNotes()
    this.socketConnection.allNotes.subscribe((response) => {
      console.log(response)
      this.notesArray = response
    })

    this.EditNoteForm = this.fb.group({
      title: [''],
      notesMessage : ['',Validators.compose([Validators.required])]
    })
    this.notesForm = this.fb.group({
      title: [''],
      notesMessage: ['', Validators.compose([Validators.required])]
    })

    this.socketConnection.getPinnedNotes()
    this.socketConnection.pinnedNotes.subscribe((response) => {
      this.PinnedArray = response;
    })
  }
  ngOnInit(): void {

  }

  @HostListener('document:click')
  clickInside() {
    if (this.notesForm.valid) {

      let Title: string = this.notesForm.value.title;
      let Message = this.notesForm.value.notesMessage;
      let URL: string = 'abc'
      let MessageType: number = Constant.Upload.message;
      this.clickCount++;
      if (this.clickCount === 1) {
        this.socketConnection.addNote({ Title, Message, MessageType, URL })
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

    }
    this.notesForm.reset();
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

    this.socketConnection.getNotes();
    this.socketConnection.allNotes.subscribe((response) => {
      console.log(response)
      this.notesArray = response
    })
  }

  pinNote(id: string) {

    this.socketConnection.pinNote(id, Constant.value.pin);
    this.socketConnection.getPinnedNotes()
    this.socketConnection.pinnedNotes.subscribe((response) => {
      this.PinnedArray = response;
    })

  }

  unpin(id: string) {
    this.socketConnection.pinNote(id, Constant.value.unpin);
    this.socketConnection.getPinnedNotes()
    this.socketConnection.pinnedNotes.subscribe((response) => {
      this.PinnedArray = response;
    })
  }
  moveToTrash(id: string) {
    this.socketConnection.trashNote(id, Constant.value.True);
    this.toaster.warning('Moved To trash', 'Sucesss',
      {
        titleClass: "center",
        messageClass: "center"
      })
  }

  moveToArchieve(id: string) {
    this.socketConnection.archieveNote(id, Constant.value.True);
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
    let MessageType: number = Constant.Upload.image

    let formdata = new FormData();
    formdata.append('file', imagePath);
    this.client.uploadImage(formdata).subscribe((response: any) => {
      this.imagePathFull = Constant.Url.IP + response.data;
      let URL: string | Blob = this.imagePathFull
      console.log(response);
      this.socketConnection.addNote({ Title, Message, MessageType, URL })
      this.socketConnection.responseNoteModel.subscribe((response) => {
        console.log(response);
        this.notesArray.push(response)
        console.log(this.notesArray)
      })
    })

  }

  toggle(expanded: any) {
    expanded = !expanded;
  }


  addEmoji(event: any) {
    let data = this.notesForm.get('inputField');
    data?.patchValue(data.value + event.emoji.native)
  }

  validateRemainder(e: Event) {

    const dateTime = new Date((e.target as HTMLInputElement).value)
    const dateNow = new Date();
    if (dateTime > dateNow) {
      this.validateTimer = true;
    }
  }

  Share(id: string) {
    let div = document.getElementsByClassName('collapse')[0];
    div.classList.add('show');
    this.noteId = id
  }

  onSubmit(data: NgForm) {
    let email = data.value.email;
    console.log(email);
      this.socketConnection.shareNote(this.noteId, email);
      this.socketConnection.shareNoteSubject.subscribe((response: any) => {
        console.log(response);

        if (response.isSuccess) {
          this.toaster.success('Mail Sent SuccessFully', 'Success',
            {
              titleClass: "center",
              messageClass: "center"
            })

            let div = document.getElementsByClassName('collapse')[0];
            div.classList.remove('show');
        }

        else {

          this.toaster.warning('Please select a person to share', 'ALERT',
            {
              titleClass: "center",
              messageClass: "center"
            })
          }
    })
  }

  editNote(id : string)
  {
    let NoteId = id;
    let Title: string = this.EditNoteForm.value.title;
    let Message = this.EditNoteForm.value.notesMessage;
    let URL: string = 'abc'
    let MessageType: number = Constant.Upload.message;

    this.socketConnection.editNote({NoteId ,Title ,Message , MessageType,URL}).then((response:any)=>{
 
      if(response.isSuccess)
      {
        this.toaster.success('Note Edited SuccessFully', 'Success',
        {
          titleClass: "center",
          messageClass: "center"
        })

        this.accordion?.closeAll();
      }

      else{
        this.toaster.error(response.message , 'Error',{
          titleClass: "center",
          messageClass: "center"
        })
      }
    });
    this.socketConnection.getNotes()
    this.socketConnection.allNotes.subscribe((response) => {
      console.log(response)
      this.notesArray = response;
    })
  }

  updateImage(event : any)
  {
    let imagePath = event.target.files[0];

    let Title: string = this.notesForm.value.title;
    let Message = this.notesForm.value.notesMessage;
    let MessageType: number = Constant.Upload.image

    let formdata = new FormData();
    formdata.append('file', imagePath);
    this.client.uploadImage(formdata).subscribe((response: any) => {
      this.imagePathFull = Constant.Url.IP + response.data;
      let URL: string | Blob = this.imagePathFull
      console.log(response);
      this.socketConnection.editNote({ Title, Message, MessageType, URL }).then((response:any)=>{
 
        if(response.isSuccess)
        {
          this.toaster.success('Note Edited SuccessFully', 'Success',
          {
            titleClass: "center",
            messageClass: "center"
          })
  
          this.accordion?.closeAll();
        }

        
          else{
            this.toaster.error(response.message , 'Error',{
              titleClass: "center",
              messageClass: "center"
            })
          }
      })
      this.socketConnection.getNotes()
      this.socketConnection.allNotes.subscribe((response) => {
      console.log(response)
      this.notesArray = response
    })
    })
  }
  }