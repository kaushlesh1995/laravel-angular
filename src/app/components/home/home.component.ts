import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalManager } from 'ngb-modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  rows = [];
  columns = [{ prop: 'name' }, { name: 'email' }];

  public error = null;
  public msg = null;

  public form = {
    name: null,
    email: null
  };

  private rowData = null;
   public currentUser : any;


  @ViewChild('myModal') myModal;
  private modalRef;

  @ViewChild(' deleteModal')  deleteModal;
  private deletemodalRef;

  constructor(private http: HttpClient,
    private route: Router,
    private modalService: ModalManager) { }



  ngOnInit(): void {
    console.log(window.localStorage.getItem("token"));
    if (window.localStorage.getItem("token")) {
      this.onGetData();
    } else {
      this.route.navigate(['/login']);
    }
      
  }

  // For get all the data using this method onGetData() 
  onGetData() {
    this.http.get('http://127.0.0.1:8000/api/auth/getData', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
        Accept: 'X-Auth-Token'})}).subscribe(
          (data: any) => {
            console.log(data);
            let results = [];
            data.forEach((user) => {
              results.push({
                name: user.name,
                email: user.email,
                id: user.id
              });
              console.log(user);
            });
            this.rowData = results;
            this.rows = results; 
          });
  }
        
   // It is logout method
   logout() {
            window.localStorage.clear();
            this.route.navigate(['/login']);
  }
      
  // For Open Update Modal
  openModal(user) {
    console.log(user);
    this.currentUser = user;
    this.form.name = user.name;
    this.form.email = user.email;
    this.modalRef = this.modalService.open(this.myModal, {
      size: "md",
    })
  }
    
  // For Open Delete Modal
  openDeleteModal(user) {
     console.log(user);
     this.currentUser = user;
    this.deletemodalRef = this.modalService.open(this.deleteModal, {
      size: "md",
    })
  }
  
  // For data Update Method
  update() {
    this.error = null;
    let user_id = this.currentUser.id;
    this.http.put('http://127.0.0.1:8000/api/auth/update/' + user_id,  this.form, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
        Accept: 'X-Auth-Token'}),}).subscribe(
          data => {
            console.log(data),
              this.msg = "Data updated Successfully"
              setTimeout(()=>{
               
                this.msg = null;
                this.modalService.close(this.modalRef);
                this.onGetData();
              } , 1000)
          
            },
            error => {
              console.log(error);
            //  console.log(error.error.errors.email);
             this.handelErrorInsert(error) 
      
            }
            )
          
  }
            

  handelErrorInsert(error){
    this.error =error.error.message;
  }
          


 // For data Delete Method
        delete() {
         this.msg = null;
          let user_id = this.currentUser.id;
          this.http.delete('http://127.0.0.1:8000/api/auth/user/' + user_id,   {
            headers: new HttpHeaders({
              'Authorization': 'Bearer ' + localStorage.getItem("token"),
              Accept: 'X-Auth-Token'}),}).subscribe(
                data => {
                  console.log(data),
                    this.msg = "Data deleted Successfully"
                })
                setTimeout(()=>{
                  this.msg = null;
                  this.modalService.close(this.deletemodalRef);
                  this.onGetData();
                } , 1000)
                  
              }


  updateFilter(event) {
     const val = event.target.value.toLowerCase();
        // filter our data
        const temp = this.rowData.filter(function (d) {
          return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        }); 
        // update the rows   
           this.rows = temp;      
   }      
              
}
