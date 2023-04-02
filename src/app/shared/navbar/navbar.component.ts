import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showFiller = false;
constructor(private route : Router , private toaster : ToastrService){}

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
showProfile()
{
  // let div = document.getElementsByClassName('modals')[0];
  // div.classList.add('show');
}

UploadProfilePhoto()
{
  
}
}
