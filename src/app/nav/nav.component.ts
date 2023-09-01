import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
isLogging = false;
constructor(private _route:Router, private http:HttpClient){
  this.getFname();

}
ngOnInit(){
  
   
}
fname: string | any;
getFname(){
  const user=  localStorage.getItem('fname');
    console.log('uss', user)
  this.fname = user;
  }


logout(){
  localStorage.clear;
    this._route.navigate(['/'])
   }




}


