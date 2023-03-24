import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  email:string='';  
  message:string ='';
  messageShow=false;
  constructor(private client : RegisterService,private route : Router){
  }
  ngOnInit(): void {
    
  }
  showPassword: boolean = true;
    passwordsMatching = false;
    isConfirmPasswordDirty = false;
    confirmPasswordClass = 'form-control'
    changePasswordform = new FormGroup({
        oldPassword:new FormControl(null,Validators.required),
        newPassword: new FormControl(null,[Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
        confirmPassword : new FormControl(null,[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")])
      
    })
    ChangePassword(data:FormGroup)
    {

      if(data.value['newPassword'] !=data.value['confirmPassword'] )
      {
         this.message='Enter same Password';
      }
       this.client.changePassword(data.value['oldPassword'],data.value['newPassword']).subscribe((value :any)=>{
        console.log(value)
        this.messageShow =true;
        if(value.statusCode =="200")
         {
         this. message = "PasswordChanged";
         alert(this.message);

         this.route.navigateByUrl('/login')
         }

        else
        {
          this.message="Please Check the information filled";
        }
       });

    }

    get fControls()
    {
        return this.changePasswordform.controls
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
        this.route.navigateByUrl('/home');
      }
}
