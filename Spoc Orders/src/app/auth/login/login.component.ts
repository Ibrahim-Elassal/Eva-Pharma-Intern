import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl,Validators,FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(   private router: Router , private auth: AuthService, ) {
    this.loginForm = new FormGroup({    
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,  Validators.pattern('(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9@$!%*#?&]{8,})$')]),
    });
  }
  
  ngOnInit(): void {
    if(!!localStorage.getItem("accesstoken")){
      this.router.navigate (['systemlayout'])
    }
  }
  
  onSubmit(loginForm:FormGroup) {
    if (this.loginForm.valid) {
        this.auth.login(this.loginForm.value).subscribe((res:any) => {
          console.log(res);
        localStorage.setItem("accesstoken" , res.token);
        localStorage.setItem("adminId" ,res.data);
        if(res && res.isSuccess && res.isSuccess == true){
          this.router.navigate(['systemlayout']);
        }else if(res && !res.isSuccess){
          alert('Failed to login');
        }else{
          alert('Something got Wrong');
        }
      }, (error :any) =>{
        alert('Something got Wrong');
      })
    }
  }
  _v() {
    return this.loginForm.value;
  }
}