import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import {MatCardModule} from '@angular/material/card';
import { CollapseModule } from '@coreui/angular';
import { AuthGaurdService } from '../utils/gaurds/auth-gaurd.service';
import { ModalModule } from '@coreui/angular';
import { SharedComponent } from './shared/shared.component';

const route : Routes = [
  {
    path : 'home' , component: HomeComponent ,canActivate :[AuthGaurdService]
  },
  {
    path : 'notes' , component: NotesComponent ,canActivate :[AuthGaurdService]
  },
  {
    path : 'trash' , component: TrashComponent ,canActivate :[AuthGaurdService]
  },
  {
    path : 'archieve' , component: ArchiveComponent ,canActivate :[AuthGaurdService]
  }
]

@NgModule({
  declarations: [
    NotesComponent,
    TrashComponent,
    ArchiveComponent,
    HomeComponent,
    SharedComponent,
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
    PickerModule,
    MatCardModule,
    CollapseModule,
    ModalModule
  ]

,
schemas :[CUSTOM_ELEMENTS_SCHEMA]
})
export class MainModule { }
