import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private app: AppComponent ,private router: Router, private authService: AuthService ) { }

  email = new FormControl("");
  password = new FormControl("");

  ngOnInit(): void {

      const user = JSON.parse(localStorage.getItem("user") as string);
      console.log(user)
   
    
  }

  onLogin(): void {
    console.log(this.email.value, this.password.value)

    if(this.email.value != null && this.password.value != null) {

      this.authService.loginWithEmailAndPassword(this.email.value, this.password.value).then( async cred => {
        console.log(cred);
       await this.router.navigateByUrl('/main');

      }).catch(err => {
        console.error(err);
      })

    }
    
  }

  toRegister(): void {
    this.router.navigateByUrl('/register');
  }
}
