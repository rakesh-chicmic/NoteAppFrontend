import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurdService } from './utils/gaurds/auth-gaurd.service';
import { InterceptorService } from './utils/interceptor/interceptor.service';

const routes: Routes = [
  {
    path:'' ,redirectTo:'auth/login', pathMatch:'full'
  },
  {
    path:'auth' , loadChildren :() => import('./auth/auth.module').then((m)=>m.AuthModule),
  },
  {
    path : 'main' , loadChildren :()=> import('./main/main.module').then((m)=>m.MainModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers :[{provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}]
})
export class AppRoutingModule { }
