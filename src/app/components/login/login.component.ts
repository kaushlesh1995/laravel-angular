import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient, private route : Router) { }
  public form = {
    email : null,
    password : null
  };
  public error = null;
  public msg = null;
  public 
  ngOnInit(): void {
    if(window.localStorage.getItem("token")){
      this.route.navigate(['/home']);
    }
  }

    
  

  onSubmit(){
    this.error = null;
    this.msg = null;
    return this.http.post('http://127.0.0.1:8000/api/auth/login', this.form).subscribe(
      (data:any)=> {
        console.log(data),
        this.msg = "Login Successfully";
        window.localStorage.setItem("token", data.access_token);
        setTimeout(()=>{
          this.route.navigate(['/home']);
        } , 1000)

      },
      error => {
        this.handelError(error)
      }
      );
      
    }
    

  handelError(error){
    this.error = error.error.message;
  }


}
