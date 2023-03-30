import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/service/register.service';
import { REGEX } from 'src/app/utils/constant';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control'
  showPassword: boolean = true;
  resetPasswordForm : FormGroup ; 
  constructor(private service : RegisterService ,private activeRoute : ActivatedRoute,private route : Router , private fb : FormBuilder , private toaster : ToastrService){
    this.resetPasswordForm = this.fb.group({
      password :['',Validators.compose([Validators.required , Validators.pattern(REGEX.PASSWORD)])],
      confirmPassword : ['' ,Validators.compose([Validators.required, Validators.pattern(REGEX.PASSWORD)])]
  })
  }
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((val:any)=>{
     this.service.registerToken(val['token']);
    })
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

resetPass()
{
  if(this.resetPasswordForm.valid)
    {

     this.service.resetPassword(this.resetPasswordForm.value).subscribe((response :any)=>{

      if(response.isSuccess)
      {

        this.toaster.success('Password Changed Successfully', 'Sucesss',
          {
            titleClass: "center",
            messageClass: "center"
          })
        localStorage.clear();
        this.route.navigate(['/login']);
      }

      else
      {
        this.toaster.warning('Please enter same Password ', 'Alert',
        {
          titleClass: "center",
          messageClass: "center"
        })
      }
    })
  }
    else
    {
        Object.keys(this.resetPasswordForm.controls).forEach(key=>this.resetPasswordForm.controls[key].markAsTouched({onlySelf:true}))
    }
}
}
