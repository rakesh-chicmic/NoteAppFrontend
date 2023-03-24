import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes/notes.component';
import { TrashComponent } from './trash/trash.component';
import { ArchiveComponent } from './archive/archive.component';



@NgModule({
  declarations: [
    NotesComponent,
    TrashComponent,
    ArchiveComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MainModule { }
