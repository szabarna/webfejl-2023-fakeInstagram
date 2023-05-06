import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Post } from '../../models/Post';
import { User } from '../../models/User';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { UserService } from '../user/user.service';
import { ExtendedPost } from '../../models/ExtendedPost';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  collectionName = "Posts"

  constructor( private asf: AngularFirestore, private userService: UserService ) { }

  createPost(post: Post) {
    let id = this.asf.createId();

    post.postId = id;

    return this.asf.collection<Post>(this.collectionName).doc(id).set({...post});
  }

updatePostLikesArray(post: ExtendedPost) {

    return this.asf.collection<Post>(this.collectionName).doc(post.postId).update({ likes: post.likes });

}

getAllPostsWithUsers(): Observable<Post[]> {
    return this.asf.collection<Post>(this.collectionName).valueChanges().pipe(
      switchMap(posts => {
        const userIds = [...new Set(posts.map(post => post.creatorId))];
        const userRequests = userIds.map(userId => this.userService.getUserById(userId));
        return combineLatest([...userRequests]).pipe(
          map(users => {
            const usersById: {[key: string]: User} = users.reduce((acc, user) => {
              acc[user[0].id] = user[0];
              return acc;
            }, {} as {[key: string]: User});
            return posts.map(post => ({
              ...post,
              creator: usersById[post.creatorId]
            }));
          })
        );
      })
    );
  }

getUsersPostsOnlyWithUserInfo(userId: string): Observable<Post[]> {
  return this.asf.collection<Post>(this.collectionName, ref => ref.where("creatorId", "==", userId)).valueChanges().pipe(
    switchMap(posts => {
      const userIds = [...new Set(posts.map(post => post.creatorId))];
      const userRequests = userIds.map(userId => this.userService.getUserById(userId));
      return combineLatest([...userRequests]).pipe(
        map(users => {
          const usersById: {[key: string]: User} = users.reduce((acc, user) => {
            acc[user[0].id] = user[0];
            return acc;
          }, {} as {[key: string]: User});
          return posts.map(post => ({
            ...post,
            creator: usersById[post.creatorId]
          }));
        })
      );
    })
  );
}

  deletePost(postId: Post["postId"]) {
    return this.asf.collection<Post>(this.collectionName).doc(postId).delete();
  }


}
