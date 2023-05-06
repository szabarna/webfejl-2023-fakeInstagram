import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private auth: AngularFireAuth, ) { }

  loginWithEmailAndPassword( email: string, password: string ) {
      return this.auth.signInWithEmailAndPassword(email, password);
  }

  registerWithEmailAndPassword( email: string, password: string ) {
      return this.auth.createUserWithEmailAndPassword(email, password);
  }


  isUserLoggedIn() {
    return this.auth.user;
    
  }

  async deleteUser() {
    return this.auth.currentUser.then(user => user?.delete());
  }

  logout() {
    return this.auth.signOut();
  }


}
