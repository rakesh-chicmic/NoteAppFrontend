import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  constructor( private route :Router , private client :RegisterService) {}
    message:string='';
    messageShow:boolean=false;

    onSubmit(data:NgForm)
    {
        let email = data.value.email;
        console.log(email)
        this.client.forgotPassword("192.180.2.133:4200/reset",data.value.email).subscribe((result:any)=>{
            console.log(result);
            this.messageShow = true;
            if(result.message=='success')
            {
            this.message=" Mail is sent to your mail Id  ";
            }

            else
            {
               this.message = result.message;
            }
        })
        //this.modalRef.close()
        this.route.navigateByUrl('/login');
    }
}
