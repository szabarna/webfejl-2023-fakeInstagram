import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { User } from '../../models/User';
import { where } from '@angular/fire/firestore';
import { Post } from '../../models/Post';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName = "Users"
  postsCollectionName = "Posts"

  constructor( private asf: AngularFirestore) {  }  

  createUser(user: User) {
    return this.asf.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  getUserById(id: string) {
    return this.asf.collection<User>(this.collectionName, ref => ref.where('id', "==", id)).valueChanges();
  }

  updateUser(user: User) {
    return this.asf.collection<User>(this.collectionName).doc(user.id).update({...user});
  }

  // deleteUser(user: User) {
  //   return this.asf.collection<User>(this.collectionName).doc(user.id).delete();
  // }

  deleteUser(user: User): Promise<void> {
    const batch = this.asf.firestore.batch();
    const userDocRef = this.asf.collection<User>(this.collectionName).doc(user.id).ref;
    const postsCollectionRef = this.asf.collection<Post>(this.postsCollectionName).ref;
    
    // Find all posts that belong to the user and delete them
    return postsCollectionRef.where('creatorId', '==', user.id).get().then(postsSnapshot => {
      postsSnapshot.forEach(postDoc => batch.delete(postDoc.ref));
      
      // Delete the user document
      batch.delete(userDocRef);
      
      // Commit the batch
      return batch.commit();
    });
  }


}
