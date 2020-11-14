import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode:boolean = false;
  

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  toggleMode()
  {
    this.registerMode = !this.registerMode;
  }

  cancel(event:boolean)
  {
    this.registerMode = event;
  }

}
