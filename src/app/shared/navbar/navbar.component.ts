import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/service/register.service';
import { Constant } from 'src/app/utils/constant';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  showFiller = false;
  UserDeatils :any =[]
  imagePath : string | Blob  ='';
constructor(private route : Router , private toaster : ToastrService , private register : RegisterService){}
  ngOnInit(): void {
   this.register.getOnlineUsers().subscribe((response : any)=>{
    console.log(response);
    this.UserDeatils.push(response.data)
    this.imagePath = Constant.Url.IP+response.data.profileImage;
    console.log(this.imagePath);
   })
  }


logOut()
{
 localStorage.clear();
 this.toaster.success('logout Successfully', 'Sucesss',
          {
            titleClass: "center",
            messageClass: "center"
          })
 this.route.navigateByUrl("/login")
}

changePass()
{
  this.route.navigateByUrl("/change")
}

showSidebar()
{
  let element = document.getElementsByClassName('offcanvas')[0];
  element.classList.add('show');
}

UploadProfilePhoto(event:any)
{
  let imagePath = event.target.files[0]
  let formData = new FormData;
  formData.append('File',imagePath)
  this.register.ProfilePic(formData).subscribe((response:any)=>{
    console.log(response);
    if(response.isSuccess)
    {
      this.toaster.success('Profile Photo updated Sucessfully', 'Sucesss',
          {
            titleClass: "center",
            messageClass: "center"
          })
    }
    this.register.getOnlineUsers().subscribe((response : any)=>{
      console.log(response);
      this.UserDeatils.push(response.data)
      this.imagePath = Constant.Url.IP+response.data.profileImage;
      console.log(this.imagePath);
     })
  });


}
}
