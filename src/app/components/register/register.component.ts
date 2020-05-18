import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http:HttpClient) { }
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
  ngOnInit(): void {
  }

  onSubmit(){
    this.error = null;
    return this.http.post('http://127.0.0.1:8000/api/auth/login', this.form).subscribe(
      data=> console.log(data),
      error => this.handelError(error) 
    );
  }
  handelError(error){
    this.error = error.error.message;
  }

  // It is only for insert data
    onInsert(){
      return this.http.post('http://127.0.0.1:8000/api/auth/signup', this.forms).subscribe(
      data=> console.log(data),
      error => this.handelErrorInsert(error) 
    );
    }

    handelErrorInsert(error){
      this.error = error.error.messages;
    }
  // It is only for insert data
}
