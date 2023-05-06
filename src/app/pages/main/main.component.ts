import { Component, isDevMode, OnDestroy, OnInit } from '@angular/core';
import {FormControl, NgModel} from "@angular/forms";
import { mergeMap, Observable, Subscription } from 'rxjs';
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import { UserService } from 'src/app/shared/services/user/user.service';
import { User } from 'src/app/shared/models/User';
import { PostService } from 'src/app/shared/services/post/post.service';
import { Post } from 'src/app/shared/models/Post';
import { ExtendedPost } from 'src/app/shared/models/ExtendedPost';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from 'src/app/shared/services/auth/auth.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  getAllPostsWithUsersSubscription?: Subscription;
  
  currentUser: User = new User();
  currentPosts?: Post[] = new Array();
  loggedInUser?: firebase.default.User | null;

  currentExtendedPosts?: ExtendedPost[] = new Array();

  constructor(private router: Router,private authService: AuthService, private appComponent: AppComponent, private userService: UserService, private postService: PostService) {
   
  }

  onLike(event: MouseEvent, post: ExtendedPost) {
    event.preventDefault();

    let init = post.likes.includes(this.loggedInUser!.uid);

    if(!init) {

      this.currentExtendedPosts?.map( (foundPost) => {

        if(foundPost.postId === post.postId)  {
          post.likes.push(this.loggedInUser!.uid);
          post.likesCount = post.likes.length.toString();
        //  console.log(init)
        }
        
      })

    } else {

      this.currentExtendedPosts?.map( (foundPost) => {

        if(foundPost.postId === post.postId) {
        //  console.log(this.loggedInUser?.uid.toString(), post.likes)
        //  console.log(post.likes, post.likesCount)

          for(var i in post.likes){
            if(post.likes[i] == this.loggedInUser?.uid){
              post.likes.splice(Number.parseInt(i),1);
                break;
            }
        }
          
          post.likesCount = post.likes.length.toString();
        //  console.log(init)
        //  console.log(post.likes, post.likesCount)
         
        }
        
      })

    }
    

    this.postService.updatePostLikesArray(post).then((e) => {

     // console.log("Updated likes sucessfully!");

    }).catch(err => {
      console.error(err);
    })

    // console.log(event.target);
  }

  onCreatePost() {
    this.router.navigateByUrl('/create-post')
  }

  ngOnInit(): void {

    //this.userLoggedInSubscription = 
    this.authService.isUserLoggedIn().subscribe( user => {

      this.loggedInUser = user;
     
  }, error => {
    console.error(error);

  });

    this.getAllPostsWithUsersSubscription = this.postService.getAllPostsWithUsers().subscribe(posts => {

        // console.log(posts);
        this.currentExtendedPosts = posts;
        this.currentExtendedPosts.map( post => {
          post.likesCount = post.likes.length.toString();
        })
      
    }, error => {
      console.log(error);
    });

}
  
  ngOnDestroy(): void {
      this.getAllPostsWithUsersSubscription?.unsubscribe();
  }

  
}

