import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent { 
  login: FormGroup|any;

  constructor(
    private _http:HttpClient,
     private _route:Router,
     public userservice:UserserviceService
     ) { }
  ngOnInit(): void {
    this.login = new FormGroup({
      'Username': new FormControl(),
      'password':new FormControl()
  })
  }

  logindata(login: FormGroup){
    //console.log(this.login.value);
    this._http.get<any>("http://localhost:3000/signup")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.Username  === this.login.value.Username && a.password === this.login.value.password
      });
console.log('usss', user)
      if(user){
        localStorage.setItem('Username', user.Username);
        localStorage.setItem('id', user.id);
        localStorage.setItem('fname', user.fname);

        Swal.fire('Successful!');
        this.login.reset();
        this._route.navigate(['/dashboard']);
        // $('.form-box').css('display','none');
      }else{
        Swal.fire('Not found')
        this._route.navigate(['login']);
      }

    }, err=>{
      Swal.fire('Something went wrongr')
    })

  }



}
