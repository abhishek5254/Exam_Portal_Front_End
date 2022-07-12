import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService, private snack: MatSnackBar) { }

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',

  };

  ngOnInit(): void {}

  formSubmit()
  {
    //alert("submit");
    console.log(this.user);
    if(this.user.username=='' )
    {
      //alert('username is required');
      this.snack.open('Username is required !!','',{
        duration:3000,
        
      })
      return;
    }
    if((this.user.password=='null') || (this.user.email=='null') || (this.user.firstName=='null') || (this.user.lastName=='null'))
    {
      this.snack.open('Fill blank fields!!','',{
        duration:3000,
        
      })
      return;
    }

    // calling add user function

    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //success
        console.log(data);
       // alert("success");
        
        Swal.fire('Successfully Registered','Thank You','success');
      },
      (error)=>{
        //error
        console.log(error);
       // alert("something went wrong");
       this.snack.open('something went wrong !!','',{
         duration:3000,
       });
      }
    );

  }



}