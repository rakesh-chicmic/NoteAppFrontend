import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/service/register.service';
import { REGEX } from 'src/app/utils/constant';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  message:string ='';
  messageShow=false;
  changePasswordform : FormGroup;
  constructor(private client : RegisterService,private route : Router, private fb : FormBuilder){
    this.changePasswordform = this.fb.group({
    oldPassword:['' , Validators.compose([Validators.required])],
    newPassword: ['' , Validators.compose([Validators.required , Validators.pattern(REGEX.PASSWORD)])],
    confirmPassword : ['' , Validators.compose([Validators.required , Validators.pattern(REGEX.PASSWORD)])]
    })
  }
  showPassword: boolean = true;
    passwordsMatching = false;
    isConfirmPasswordDirty = false;
    confirmPasswordClass = 'form-control';

    ChangePassword(data:FormGroup)
    { 
      if(this.changePasswordform.valid)
      {
       this.client.changePassword(data.value['oldPassword'],data.value['newPassword']).subscribe((value :any)=>{
        console.log(value)
        this.messageShow =true;
        if(value.statusCode =="200")
         {
         this. message = "PasswordChanged";
         alert(this.message);

         this.route.navigateByUrl('/login')
         }

        })
       }
    else
    {
        Object.keys(this.changePasswordform.controls).forEach(key=>this.changePasswordform.controls[key].markAsTouched({onlySelf:true}))
    }
  }


    checkPasswords(pw: string, cpw: string) {
        this.isConfirmPasswordDirty = true;
        if (pw == cpw) {
          this.passwordsMatching = true;
          this.confirmPasswordClass = 'form-control is-valid';
        } else {
          this.passwordsMatching = false;
          this.confirmPasswordClass = 'form-control is-invalid';
        }
      }

      public togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
      }

      GoBack()
      {
        this.route.navigateByUrl('main/notes');
      }
}
