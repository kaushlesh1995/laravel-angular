import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http:HttpClient,private route : Router) { }
  public form = {
    email : null,
    password : null,
    name : null,
    confirmPassword : null
  };
  public forms = {
    email : null,
    password : null,
    name : null,
    password_confirmation : null
  };
  public error = null;
  public msg = null;
  ngOnInit(): void {
    console.log( window.localStorage.getItem("token"));
    if(window.localStorage.getItem("token")){
     
      this.route.navigate(['/home']);

    }
  }

  onSubmit(){
    this.error = null;
    return this.http.post('http://127.0.0.1:8000/api/auth/login', this.form).subscribe(
      (data:any)=> {console.log(data),
              window.localStorage.setItem("token" , data.access_token);
              this.route.navigate(['/home']);
      },
      error => this.handelError(error) 
    );
  }
  handelError(error){
    this.error = error.error.message;
  }

  // It is only for insert data
    onInsert(){
    this.error = null;
     return this.http.post('http://127.0.0.1:8000/api/auth/signup', this.forms).subscribe(
      data=>{
        console.log(data),
        this.msg = "Regitration Successful"
      },
      error => this.handelErrorInsert(error) 
    );
    }

    handelErrorInsert(error){
      this.error = error.error.messages;
    }
  // It is only for insert data
}
