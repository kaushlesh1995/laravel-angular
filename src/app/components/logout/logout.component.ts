import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  public form = {
    email : null,
    password : null
  };
  public error = null;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(){
    return this.http.get('http://127.0.0.1:8000/api/auth/logout').subscribe(
      error => this.handelError(error) 
    );
  }

  handelError(error){
    this.error = error.error.message;
  }

}
