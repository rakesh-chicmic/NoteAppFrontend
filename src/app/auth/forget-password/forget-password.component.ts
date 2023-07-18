import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  constructor(private route: Router, private client: RegisterService, private toaster: ToastrService) { }
  message: string = '';
  messageShow: boolean = false;

  onSubmit(data: NgForm) {
    let email = data.value.email;
    console.log(email)
    this.client.forgotPassword("http://localhost:4200/reset", data.value.email).subscribe((result: any) => {
      console.log(result);
      this.messageShow = true;
      if (result.statusCode === 200) {
        this.toaster.success('Verify your Email', 'Sucesss',
          {
            titleClass: "center",
            messageClass: "center"
          })
        this.route.navigateByUrl('/login');
      }

      else {
        this.toaster.error(result.message, 'Error', {
          titleClass: "center",
          messageClass: "center"
        })
      }
    })
    //this.modalRef.close()
  }
}
