import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/service/register.service';
import { REGEX } from 'src/app/utils/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
Signup() {
throw new Error('Method not implemented.');
}
  showPassword: boolean = true;
  name:string = '';
  loginForm : FormGroup;
  message :string ='';
  messageShow :boolean = false;
  constructor( private service : RegisterService ,private route : Router ,private fb : FormBuilder) {

  this.loginForm = this.fb.group({
      email :['',Validators.compose([Validators.required , Validators.pattern(REGEX.EMAIL)])],
      password : ['' ,Validators.compose([Validators.required, Validators.pattern(REGEX.PASSWORD)])]
  })
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  loginUser()
  {
    if(this.loginForm.valid)
    {

      this.messageShow=true;
     this.service.loginUser(this.loginForm.value).subscribe((response :any)=>{

      console.log(response)
      if(response.isSuccess)
      {
        this.route.navigate(['/home']);
        this.service.registerToken(response.data['token']);
      }
    })
  }
    else
    {
        Object.keys(this.loginForm.controls).forEach(key=>this.loginForm.controls[key].markAsTouched({onlySelf:true}))
    }
  }

  RegisterForm()
  {
     this.route.navigateByUrl('/sign-in')
  }

  mailSend()
  {
    this.route.navigateByUrl('/forgot');
  }
}
