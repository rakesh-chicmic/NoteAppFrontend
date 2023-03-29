import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Constant } from '../utils/constant';
import { CommonHttpService } from './common-http.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private client: CommonHttpService) { }

  signUpUser(details: FormGroup) {
    return this.client.httpPost(Constant.Auth.signIn, details)
  }

  loginUser(details: FormGroup) {
    return this.client.httpPost(Constant.Auth.login, details)
  }

  forgotPassword(url: string, email: string) {
    return this.client.httpPost(Constant.Url.sendMail, { url, email })
  }

  resetPassword(newPass: string) {
    return this.client.httpPost(Constant.Url.resetPassword, { newPass })
  }

  changePassword(oldPassword: string, newPassword: string) {
    return this.client.httpPost(Constant.Url.resetPassword, { oldPassword, newPassword })
  }

  registerToken(value: string) {
    localStorage.setItem("token", value)
  }

  returnToken() {
    return localStorage.getItem("token");
  }

  isLoggedIn(): boolean {
    return !localStorage.getItem('token')
  }

  uploadImage(File :any)
  {
    return this.client.httpPost(Constant.Url.fileUpload,File)
  }

}
