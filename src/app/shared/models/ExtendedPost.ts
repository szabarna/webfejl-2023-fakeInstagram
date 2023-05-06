import { User } from './User'

export class ExtendedPost {

    creatorId?: User["id"];
    postId: string = "";
    imgString: string = "";
    description: string = "";
    likes: User["id"][] = new Array<User["id"]>();
    likesCount?: string = "";
    creator?: User;

    constructor(obj: any = null) {
      if (obj != null){
        Object.assign(this, obj);
      }
    }

  }
