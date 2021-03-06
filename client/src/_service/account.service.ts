import { User } from './../_models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseURL = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable()

  constructor(private http:HttpClient) {

   }

   login(model:any)
   {
     return this.http.post(this.baseURL+'account/login',model).pipe(
       map((response:User)=>{
         var user = response;
         localStorage.setItem('user',JSON.stringify(user));
         this.currentUserSource.next(user);
       })
     );
   }

   setCurrentUser(user:User)
   {
     this.currentUserSource.next(user);
   }

   register(model:any)
   {
     return this.http.post(this.baseURL+'account/register',model).pipe(
       map((user:User) => {
         if(user)
         {
           localStorage.setItem('user',JSON.stringify(user));
           this.currentUserSource.next(user);
         }
         return user;
       })
     )
   }

   logout(){
     localStorage.removeItem('user');
     this.currentUserSource.next(null);
   }
}
