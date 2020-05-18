import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';


const routes: Routes = [{path :'login', component : LoginComponent},
                        
                        {path :'register', component : RegisterComponent},
                        {path :'logout', component : LogoutComponent},
];
  
 




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
