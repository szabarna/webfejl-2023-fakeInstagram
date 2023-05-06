import { User } from './User'

export class Post {

    creatorId: User["id"] = "";
    postId: string = "";
    imgString: string = "";
    description: string = "";
    likes: User["id"][] = new Array<User["id"]>();


    constructor(obj: any = null) {
      if (obj != null){
        Object.assign(this, obj);
      }
    }

  }
