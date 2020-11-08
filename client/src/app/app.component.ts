import { AccountService } from './../_service/account.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'The dating app';
  users:any;

  constructor(private http:HttpClient,private accountService:AccountService)
  {

  }
  ngOnInit(): void {
    
    this.setCurrentUser();
  }

  setCurrentUser()
  {
    const user:User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

  
}
