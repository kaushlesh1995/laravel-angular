import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  rows = [];
  columns = [{ prop: 'name' }, { name: 'email' }];
    
    public error = null;
     
  constructor(private http:HttpClient,private route : Router  )  { }
     
   

  ngOnInit(): void {
    console.log( window.localStorage.getItem("token"));
    if(window.localStorage.getItem("token")){
      this.onGetData();

    }else{
      this.route.navigate(['/login']);
    }
  }

  onGetData(){
      this.http.get('http://127.0.0.1:8000/api/auth/getData' , { headers: new HttpHeaders({
         'Authorization':'Bearer ' + localStorage.getItem("token"),
         
        Accept : 'X-Auth-Token'
        }) }).subscribe(
        (data:any)=> {console.log(data);
          data.forEach( (user)=> { 
            this.rows.push({
              name:user.name, 
              email:user.email

            }); 
            console.log(user);  
          });
                
         this.rows = [...this.rows];
        });
    } 

    logout(){
      window.localStorage.clear();
      this.route.navigate(['/login']);
    }
    

}

