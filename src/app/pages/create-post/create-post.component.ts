import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/models/Post';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { PostService } from 'src/app/shared/services/post/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  description = new FormControl("");
  postPicture: string = "";

  srcResult: Blob = new Blob();


  constructor(private router: Router, private postService: PostService, private authService: AuthService) {
   
  }

  onCreatePost() {

    let user = JSON.parse(localStorage.getItem("user") as string);

    let postToBeAdded = new Post({
        creatorId: user.uid,
        description: this.description.value,
        imgString: this.postPicture
    });

    console.log(postToBeAdded)

    this.postService.createPost(postToBeAdded).then((v) => {
      console.log("Post sucessfully added!")

      this.router.navigateByUrl('/main')

    }).catch(err => {
      console.error(err);
    })

  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
        console.log(this.srcResult);

        this.postPicture = (this.srcResult).toString();
      };
  
      reader.readAsDataURL(inputNode.files[0]);
      console.log(inputNode.files[0])
      
    }
  }

  ngOnInit(): void {

  }

}
