import { AccountService } from './../../_service/account.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model:any={};
  

  constructor(public accountService:AccountService , private router:Router , private toast:ToastrService) { }

  ngOnInit(): void {
    
  }

  login()
  {
    this.accountService.login(this.model).subscribe(response=>{
      this.router.navigateByUrl('/members');
    },error=>{
      console.log(error);
      this.toast.error(error.error);
    }
    )
  }
  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
