import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import { AuthService } from './shared/services/auth/auth.service';
import { User } from './shared/models/User';
import { UserService } from './shared/services/user/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  userLoggedInSubscription?: Subscription;

  loggedInUser?: firebase.default.User | null;
  userInfo?: User = new User();
 
  constructor(private router: Router, private authService: AuthService, private userService: UserService) {

  }

  ngOnInit(): void {
   
    this.userLoggedInSubscription = this.authService.isUserLoggedIn().subscribe( user => {

        this.loggedInUser = user;
       // console.log(user?.uid);
        localStorage.setItem('user', JSON.stringify(this.loggedInUser));
        
        if(user === null) this.router.navigateByUrl('/login')

        if(this.loggedInUser?.uid) {
          this.userService.getUserById(this.loggedInUser.uid).subscribe(users => {
    
            this.userInfo = users[0];
         //   console.log(this.userInfo);
      
          }, error => {
              console.log(error);
          });
        }

    }, error => {
      console.error(error);
      localStorage.setItem("user", JSON.stringify('null'));
    });
    
  }

  onProfile() {
    this.router.navigateByUrl('/profile');
  }

  onHome() {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    this.router.navigateByUrl('/main');
  }

  onLogout() {
    this.authService.logout().then( () => {
      console.log("Logged out user.");
      localStorage.setItem("user", JSON.stringify('null'));
    }).catch( (err) => {
      console.error(err);
    });
  }

  ngOnDestroy(): void {
      console.log("destroyed")
      this.userLoggedInSubscription?.unsubscribe();
      localStorage.setItem("user", JSON.stringify('null'));
  }

}
