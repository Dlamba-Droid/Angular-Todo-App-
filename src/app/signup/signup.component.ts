import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private _http:HttpClient, private _route:Router) {}
  signup:FormGroup|any;
  signuser:any;

  ngOnInit(): void {
    this.signup = new FormGroup({
      'fname': new FormControl(),
      'lname': new FormControl(),
      'Username': new FormControl(),
      'Email': new FormControl(),
      'phone': new FormControl(),
      'password': new FormControl()

    })

  }

  signupdata(signup:FormGroup){
    //console.log(this.signup.value);
    this._http.get<any>("http://localhost:3000/signup")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.Username === this.signup.value.Username
      });
      if(user){
        Swal.fire({
          title: "Username Exists",
          text: "Try a different username"
        });
      }else{
        this.signuser = this.signup.value.fname
        this._http.post<any>("http://localhost:3000/signup", this.signup.value)
        .subscribe(res=> {
          Swal.fire('Success');
          this.signup.reset();
          this._route.navigate(['/']);
        }, err=>{
          alert("something went wrong");
        })
      }
    })
    

  } 
}
