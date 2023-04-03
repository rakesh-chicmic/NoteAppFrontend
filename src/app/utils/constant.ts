export const REGEX = {
    USERNAME: /[a-zA-Z0-9]{3,}/,
    EMAIL: /[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\.[a-z]{2,3}/,
    PASSWORD: /^(?=.{6,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
    CPF:/\d{3}\.\d{3}\.\d{3}\-\d{2}/,
    YOUTUBE_LINK:/^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/,
    PHONE:/^[6-9]\\d{9}$/,
    DOMAIN:/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/,
    ACCOUNT_NUMBER:/^[0-9]{9,18}$/
  };

  export const Constant = {

    Auth : {
       login: 'User/Login',
       signIn : 'User/Register'
   },
    
   Url :
   {
     changePassword :'User/ChangePassword',
     resetPassword :'Password/ResetPassword',
     sendMail :'Password/ForgetPassword',
     logout :'Login/logOut',
     user :'User/GetUser',
     profile : 'User/UpdateProfile',
     IP : "http://192.180.0.127:4041/" ,
     profilePic : "User/ImageUpload",
     update : 'User/UpdateProfile',
     fileUpload : "File/FileUpload"

   },

   value :
   {
     pin : 1,
     unpin : 0,
     True : true,
     False : false
   },

    Upload :
    {
       message : 1,
       image : 2
    },

    ButtonArray :  ['trash' , 'notes' , 'archieve' ,'shared']
    
}
  