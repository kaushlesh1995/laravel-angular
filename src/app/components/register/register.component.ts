import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('registrationForm') registerForm: NgForm;

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
      this.route.navigate(['/home']);}
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
    error => {error.error.message
    } 
  }
     

  validatePasswords() {
    if (this.forms.password !== this.forms.password_confirmation) {
      this.registerForm.controls['password_confirmation'].setErrors({'incorrect': true});
    }
      if(this.forms.email == true){
        this.registerForm.controls['email'].setErrors({'incorrect': true});

      }
  }

  // It is only for insert data
    onInsert(registrationForm: any){
    this.error = null;
      this.msg = null;
     return this.http.post('http://127.0.0.1:8000/api/auth/signup', this.forms).subscribe(
      data=>{
        
        console.log(data),
        this.msg = "Regitration Successful"
        setTimeout(()=>{
          this.route.navigate(['/login']);
        } , 1000)
      },
      error => {
        console.log(error.error.message);
        console.log(error.error.errors.email);
      console.log(error.error.errors.password);
        this.handelErrorInsert(error) ;
        this.passwordError(error);

      }
    );
    
    }

    handelErrorInsert(error){
      this.error =error.error.errors.email;
      
    }

    passwordError(error){
      this.error = error.error.errors.password[0];
    }
  // It is only for insert data
}
