import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { UserserviceService } from '../userservice.service';

export interface TaskResources {
  Heading: string,
  Description: string,
  UserID: string,
  Date: string

}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  posts:any[]=[];
  filteredItems:any[] = [];
  fname: string | null  = '';
  username: string | null ='';
  id: string | null = '';
  lname: string |null = '';
  Date: string = '';
  startdate: string='';
  enddate: string='';


  newPost = {Heading: '', Description:'', UserID: this.id, Date:''};


targetDate: string;
today: String = new Date().toISOString().split('T')[0];

  constructor(private http:HttpClient, public userservice:UserserviceService){

    this.newPost.Description = '';
    this.newPost.Heading = '';
    this.newPost.UserID = this.getId();
    this.newPost.Date = new Date().toISOString().split('T')[0];

    this.getFname();
    this.getId();
    this.getusername();
    this.getDate();
    
    this.targetDate = this.Date
    
  }

  getFname(){
    //let strs = localStorage.getItem('fname');
    this.fname = localStorage.getItem('fname');
    return this.fname;
   }
 
   getId(){
     let strr = localStorage.getItem('id')
     console.log('shshs', strr)
     this.id = strr
     return localStorage.getItem('id');
   } 
   
   getusername(){
    let tee = localStorage.getItem('username');
    console.log('ubs', tee)
    this.username = tee
  
   }
   
   getDate(){
    let day = localStorage.getItem('Date');
    console.log('datt', day);
    return day;
   }



  ngOnInit(): void{
    console.log(this.newPost);
    this.fetchPosts();

  }

  onDateSearch() {
    if (this.startdate && this.enddate) {
      const start = new Date(this.startdate)
      const end = new Date(this.enddate)
      this.filteredItems = this.posts.filter(task => {
        const taskdate = new Date(task.Date);
        return taskdate >= start && taskdate <= end && task.UserID === this.id;
      }
        );
    } else {
      this.filteredItems = this.posts.filter(item => item.UserID === this.id);
    }
  }

  delete(postid: number): void{
     Swal.fire({
      title: "Confirm",
      text: 'Are you sure you want to delete this task?',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7367F0",
      cancelButtonColor: "#E42728",
      confirmButtonText: "Yes",
      customClass: {
       confirmButton: "btn btn-primary",
       cancelButton: "btn btn-danger ml-1",
      },
     }).then((result) => {
      if (result.value) {
        console.log(postid);
        
        this.http.delete(`http://localhost:3000/signup/${postid}`)
        .subscribe(
          () => {
            Swal.fire({
              icon: "success",
              title: "Task Deleted",
              text: "Your task has been deleted!",
              customClass: {
               confirmButton: "btn btn-success",
              },
             }).then((result) => {
              window.location.reload();
             });
          },
          (error) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: error,
          customClass: {
           confirmButton: "btn btn-danger",
          },
         });
      }
    );
      }
     });

  }

  fetchPosts() {
    this.userservice.getContent()
    .subscribe(
      (response: any) => {
        this.posts = response;
        this.filteredItems = this.posts.filter(item => item.UserID === this.id);
        const user = response.find((a:any)=>{
          return a.filteredItems.Date  
        });
        if(user){
          localStorage.setItem('date', user.Date)
        }
      },error => {
        console.error('Error fetching posts: ', error);
      }
    );
  }

  

  Addtask(){

    const options = { responseType: 'text' as 'json' };
    this.http.post('http://localhost:3000/signup', this.newPost)
    .subscribe(
      response => {
        console.log(response);
        Swal.fire({
          icon: "success",
          title: "New Task added!",
          text: "Your task has been added successfully!",
          customClass: {
           confirmButton: "btn btn-success",
          },
         }).then((result) => {
          window.location.reload();
         });
        console.log(this.Addtask)
        // location.reload();
        //this.newPost.id = 
      }, error=> {
        console.error('An error occured', error);
      }
    );
   
  }
  

}
