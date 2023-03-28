import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SocketConnectionService } from 'src/app/service/socket-connection.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {

  notes: string = '';
  notesForm: FormGroup;
  clickCount: number = 0;
  notesArray: any = [];
  showDate: boolean = false;

  constructor(private fb: FormBuilder, private socketConnection: SocketConnectionService) {
    this.socketConnection.getNotes();

    this.notesForm = this.fb.group({
      title: [''],
      notesMessage: ['', Validators.compose([Validators.required])]
    })
  }
  ngOnInit(): void {
    this.socketConnection.startConnection();
  }

  @HostListener('document:click')
  clickInside() {

    if (this.notesForm.valid) {

      let Title: string = this.notesForm.value.title;
      let Message: string = this.notesForm.value.notesMessage;
      let MessageType: number = 1
      this.clickCount++;
      if (this.clickCount === 1) {
        this.socketConnection.addNote({ Title, Message, MessageType })
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


  showDatePicker() {
    this.showDate = true;
    let div = document.getElementsByClassName('modal')[0];
    div.classList.add('show')
  }
  public filterDateFrom: any;
  onDate(event: any): void {
    console.log(event.target.value)
    this.filterDateFrom = event.target.value;
  }

  createTimer(id: string) {
    alert(id);
    this.socketConnection.addTimer(id, this.filterDateFrom).then((response: any) => {
      console.log(response);
    })
  }

  pinNote() {

  }


}
