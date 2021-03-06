import { MessagesComponent } from './messages/messages.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path:'' ,  component:HomeComponent},
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate :[AuthGuard],
    children:[
      {path:'members' ,  component:MemberListComponent , canActivate: [AuthGuard]},
      {path:'members/:id' ,  component:MemberDetailComponent},
      {path:'lists' ,  component:ListsComponent},
      {path:'messages' ,  component:MessagesComponent},
    ]
  },
  {path:'**' ,  component:HomeComponent , pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
