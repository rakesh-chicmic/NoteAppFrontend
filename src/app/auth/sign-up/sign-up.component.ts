import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/service/register.service';
import { REGEX } from 'src/app/utils/constant';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  showPassword: boolean = true;
  message:string='';
  messageShow:boolean =false;  
  validateDateOfbirth: boolean =false;
  btnclick: boolean =false ;
  registrationForm:FormGroup;
  constructor( private route : Router , private fb:FormBuilder , private client : RegisterService , private toaster : ToastrService ){
      this.registrationForm = this.fb.group({
          firstName:['',Validators.required],
          lastName:['',Validators.required],
          email:['', Validators.compose([Validators.required,Validators.pattern(REGEX.EMAIL)])],
          phone:['',Validators.compose([Validators.required,Validators.pattern("^[6-9]\\d{9}$")])],
          password:['',Validators.compose([Validators.required,Validators.pattern(REGEX.PASSWORD)])]
      })
  }

  resgisterUser()
  {
      if(this.registrationForm.valid)
  {
      this.client.signUpUser(this.registrationForm.value).subscribe((response :any)=>{
        if(response.isSuccess)
        {
          this.route.navigate(['/home']);
           this.client.registerToken(response.data['token']);
           this.toaster.success('User Registered  Successfully', 'Sucesss',
           {
             titleClass: "center",
             messageClass: "center"
           })
        }

        else{
          this.toaster.error(response.message , 'Error',{
            titleClass: "center",
            messageClass: "center"
          })
        }
      })
  } else{
      Object.keys(this.registrationForm.controls).forEach(key=>this.registrationForm.controls[key].markAsTouched({onlySelf:true}))
  }
  }


  login()
  {
      this.route.navigateByUrl('/login')
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  validateDOB(e: Event){

    const year = new Date((e.target as HTMLInputElement).value).getFullYear();
    const today = new Date().getFullYear();
  
    if( (today-year) < 12 || (today -year)>100){
      this.validateDateOfbirth= true
      
    }else{
      this.validateDateOfbirth = false
    }
  
  }
}
