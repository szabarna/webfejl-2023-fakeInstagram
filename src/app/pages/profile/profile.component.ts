import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ExtendedPost } from 'src/app/shared/models/ExtendedPost';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { PostService } from 'src/app/shared/services/post/post.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  currentUser: User = new User();
  currentExtendedPosts: ExtendedPost[] = Array();
  loggedInUser?: firebase.default.User | null;

  constructor(private router: Router, private userService: UserService, private authService: AuthService, private postService: PostService) {
   
  }


  ngOnInit(): void {

      this.loggedInUser = JSON.parse(localStorage.getItem("user") as string);

      if( this.loggedInUser ) {

     
        this.userService.getUserById(this.loggedInUser!.uid).subscribe(users => {

          this.currentUser = users[0];
        // console.log(this.currentUser);

        this.postService.getUsersPostsOnlyWithUserInfo(this.currentUser.id).subscribe(posts => {

          // NESTED SUBSCRIBE IS PROBLEM FOR FUTURE IT IS WHAT IT IS NOW
         // console.log(posts);
          this.currentExtendedPosts = posts;
          this.currentExtendedPosts.map( post => {
            post.likesCount = post.likes.length.toString();
          })
        
        }, error => {
          console.log(error);
        });

    
      }, error => {
            console.log(error);
    });
}




  }

  onDeletePost(postId: string) {
      this.postService.deletePost(postId).then(() => {
        
        console.log("Post sucessfully deleted!")

      }).catch(err => {
        console.error(err);
      })
  }

  onEditProfile() {
    this.router.navigateByUrl('/edit-profile')
  }

}
