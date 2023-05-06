import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {

  currentUser?: User = new User();

  email = new FormControl("");
  fullName = new FormControl("");
  userName = new FormControl("");
  userPicture: string = "";

  srcResult: Blob = new Blob();


  constructor(private router: Router, private userService: UserService, private authService: AuthService) {
   
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      //  console.log(this.srcResult);

        this.userPicture = (this.srcResult).toString();
      };
  
      reader.readAsDataURL(inputNode.files[0]);
    //  console.log(inputNode.files[0])
      
    }
  }

  ngOnInit(): void {

    let loggedInUser = JSON.parse(localStorage.getItem("user") as string);

    if(loggedInUser?.uid) {
      this.userService.getUserById(loggedInUser.uid).subscribe(users => {

        this.currentUser = users[0];
       // console.log(this.currentUser);

       this.email.setValue(this.currentUser?.email);
       this.fullName.setValue(this.currentUser?.fullName);
       this.userName.setValue(this.currentUser?.userName);
       this.userPicture = this.currentUser?.userPicture;
  
      }, error => {
          console.log(error);
      });
    }

  }

  onDelete() {
    let userToBeDeleted = new User({
      email: this.email.value,
      fullName: this.fullName.value,
      id: this.currentUser?.id,
      userName: this.userName.value,
      userPicture: this.currentUser?.userPicture
    });

    this.userService.deleteUser(userToBeDeleted).then(( ) => {
      console.log("User deleted succesfully!");
      localStorage.setItem("user", JSON.stringify("null"));

      this.authService.deleteUser().then(() => {
        console.log("Firebase Auth User Deleted succesfully!")
      }).catch(err => {
        console.error(err);
      });

      this.router.navigateByUrl('/login')
      
      
  }).catch(err => {
    console.error(err);
   
    })

  }

  onUpdate() {
      if(this.currentUser) this.currentUser.userPicture = this.userPicture;

      let userToBeUpdated = new User({
          email: this.email.value,
          fullName: this.fullName.value,
          id: this.currentUser?.id,
          userName: this.userName.value,
          userPicture: this.currentUser?.userPicture
      });

     // console.log(userToBeUpdated);

      this.userService.updateUser(userToBeUpdated).then((  ) => {
          console.log("Profile data updated succesfully!");

          this.router.navigateByUrl('/profile')
          
      }).catch(err => {
        console.error(err);
        console.log("IMG must be less than 1MB!")
      })
  }
}
