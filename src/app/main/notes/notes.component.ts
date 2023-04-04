import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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


  visible = false;
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;

  notes: string = '';
  notesForm: FormGroup;
  notesArray: any = [];
  showDate: boolean = false;
  noteId: string = ''
  imagePathFull: Blob | string = ''
  PinnedArray: any = [];
  isEmojiPickerVisible: boolean = false;
  validateTimer: boolean = false;
  Image = Constant.Upload.image;
  Title: string = ''
  Message: string = ''
  constructor(private fb: FormBuilder, private socketConnection: SocketConnectionService, private client: RegisterService, private toaster: ToastrService) {


    this.notesForm = this.fb.group({
      title: [''],
      notesMessage: ['', Validators.compose([Validators.required])]
    })

  }
  ngOnInit(): void {
    this.socketConnection.getNotes()
    this.socketConnection.allNotes.subscribe((response) => {
      console.log(response)
      this.notesArray = response;
    })

    this.socketConnection.getPinnedNotes()
    this.socketConnection.pinnedNotes.subscribe((response) => {
      this.PinnedArray = response;
    })
  }


  AddNote() {
    console.log('heyyyyyyy')
    if (this.notesForm.valid) {

      let Title: string = this.notesForm.value.title;
      let Message = this.notesForm.value.notesMessage;
      let URL: string | Blob = 'abc'
      let MessageType: number = Constant.Upload.message;

      if (this.imagePathFull) {
        MessageType = Constant.Upload.image;
        URL = this.imagePathFull;
      }

      this.socketConnection.addNote({ Title, Message, MessageType, URL })
      this.socketConnection.responseNoteModel.subscribe((response: any) => {
        if (response.isSuccess) {
          this.toaster.success('Note Edited SuccessFully', 'Success',
            {
              titleClass: "center",
              messageClass: "center"
            })
          console.log(response.data);
          this.notesArray.push(response.data)
          console.log(this.notesArray)
        }
      })
    }
    this.notesForm.reset();
    this.imagePathFull = '';
  }

  showDatePicker(id: string) {
    this.noteId = id
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
      if (response.isSuccess) {
        this.toaster.success('Timer added Succesfully', 'Success',
          {
            titleClass: "center",
            messageClass: "center"
          })
          let div = document.getElementsByClassName('modal')[0];
          div.classList.remove('show')
        }

        else
        {
          this.toaster.error(response.message, 'error',
          {
            titleClass: "center",
            messageClass: "center"
          })
        }
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
    this.socketConnection.pinNote(id, Constant.value.unpin)
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

    let formdata = new FormData();
    formdata.append('File', imagePath);
    this.client.uploadImage(formdata).subscribe((response: any) => {
      this.imagePathFull = Constant.Url.IP + response.data;
      let URL: string | Blob = this.imagePathFull
      console.log(response);
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
    if (dateTime < dateNow) {
      this.validateTimer = true;
    }
    else
    {
      this.validateTimer=false
    }
  }

  Share(id: string) {
    let div = document.getElementsByClassName('collapse')[0];
    div.classList.add('show');
    this.noteId = id;
  }

  onSubmit(data: NgForm) {
    let email = data.value.email;
    console.log(email);
    this.socketConnection.shareNote(this.noteId, email);
    this.socketConnection.shareNoteSubject.subscribe((response: any) => {
      console.log(response);

      if (response.isSuccess) {
        this.toaster.success('Note shared Successfully', 'Success',
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

        this.accordion?.closeAll();
      }

      else {
        this.toaster.error(response.message, 'Error', {
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
    Title = '';
    Message = '';
  }

 

  toggleCollapse(id:number) {
    if(this.notesArray[id].isVisible)
    {
      this.notesArray[id].isVisible=false;
    }
    else
    {
      this.notesArray[id].isVisible=true;
    }
  }

  toggleCollapsePin(id:number)
  {
    if(this.PinnedArray[id].isVisible)
    {
      this.PinnedArray[id].isVisible=false;
    }
    else
    {
      this.PinnedArray[id].isVisible=true;
    }
  }
  showEditForm() {

    console.log('gfdshfgdhsz')
    let div = document.getElementsByClassName('fade')[0];
    div.classList.add('show');
  }

  getValueOfTitle(event: any) {
    this.Title = event.target.value
  }

  getValueOfMessage(event: any) {
    this.Message = event.target.value
  }
}