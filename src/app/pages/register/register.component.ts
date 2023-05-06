import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/User';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email = new FormControl("");
  fullName = new FormControl("");
  userName = new FormControl("");
  password = new FormControl("");
  
  constructor( private router: Router , private authService: AuthService, private userService: UserService ) { }

  
  ngOnInit(): void {
  }

  onRegister(): void {
    console.log(this.email.value, this.password.value, this.fullName.value, this.userName.value)

    if(this.email.value != null && this.password.value != null && this.fullName.value != null && this.userName.value != null ) {

      this.authService.registerWithEmailAndPassword(this.email.value, this.password.value).then( cred => {
        
        console.log(cred.user);
        const user:User = {
            
            email: this.email.value as string,
            fullName: this.fullName.value as string,
            id: cred.user?.uid as string,
            userName: this.userName.value as string,
            userPicture: ""
        }

        this.authService.logout().then((cred) => console.log(cred)).catch(err => console.error(err) );

        this.userService.createUser(user).then( () => {
            console.log("User added succesfully.");
        }).catch(err => {
            console.log(err);
        });


        this.router.navigateByUrl('/login')

      }).catch(err => {
        console.error(err);
      });

    }
  }

  toLogin(): void {
    this.router.navigateByUrl('/login')
  }
}
