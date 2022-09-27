import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // 1. Create The Variable that will hold our form with Type (FormGroup)
  // 2. We should create a formGroup !! but it will be more code !! what about using => FormBuilder Service
  // 3. I will use .group method to create a FormGroup for me!
  // 4. Group method needs an object to make it understand the shape of the form you want
  // 5. Then we should attach this form group to HTML!!

  signUpForm: FormGroup = this.fb.group({
    name: ['',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]],
    age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)]],
    confirmPassword: ''
  });;



  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onRegisterNewUser(): void {
    this.auth.createUser(this.signUpForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/login']);
      }
    })
  }

}
