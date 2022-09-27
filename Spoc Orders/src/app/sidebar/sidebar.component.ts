import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem("accesstoken") && !localStorage.getItem("adminId")){
      this.router.navigate (['login'])
    }
  }

  public logOut() {
    localStorage.removeItem("accesstoken")
    localStorage.removeItem("adminId")
    this.router.navigate(['/login']);
  }
}
