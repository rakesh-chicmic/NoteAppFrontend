import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes/notes.component';
import { TrashComponent } from './trash/trash.component';
import { ArchiveComponent } from './archive/archive.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion'; 
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule} from '@angular/material/datepicker'
import { MatNativeDateModule} from '@angular/material/core';
import { HomeComponent } from './home/home.component'
import { MatSidenavModule } from '@angular/material/sidenav';

const route : Routes = [
  {
    path : 'home' , component: HomeComponent
  },
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
    HomeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route),
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    FormsModule,
  ]
})
export class MainModule { }
