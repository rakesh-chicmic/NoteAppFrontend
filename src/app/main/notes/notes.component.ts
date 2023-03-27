import { Component, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {

  notes :string = '';
notesForm: any;
  constructor() {}
  @HostListener('document:click')
  clickout(event : any) {
  console.log(event.target.value);
  }

  save()
  {
    console.log(this.notesForm.value);
  }
}
