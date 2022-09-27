import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: IUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  constructor() { }

  ngOnInit(): void {
  }

}
