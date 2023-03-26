import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes/notes.component';
import { TrashComponent } from './trash/trash.component';
import { ArchiveComponent } from './archive/archive.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

const route : Routes = [
  {
    path : 'notes' , component: NotesComponent
  },
  {
    path : 'trash' , component: TrashComponent
  },
  {
    path : 'archieve' , component: ArchiveComponent
  }
]

@NgModule({
  declarations: [
    NotesComponent,
    TrashComponent,
    ArchiveComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route),
    MatInputModule,
    MatFormFieldModule
  ]
})
export class MainModule { }
