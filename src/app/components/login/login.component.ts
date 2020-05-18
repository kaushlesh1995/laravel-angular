import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient) { }
  public form = {
    email : null,
    password : null
  };
  public error = null;
  ngOnInit(): void {
  }

  onSubmit(){
    return this.http.post('http://127.0.0.1:8000/api/auth/login', this.form).subscribe(
      data=> console.log(data),
      error => this.handelError(error) 
    );
  }

  handelError(error){
    this.error = error.error.message;
  }


}
