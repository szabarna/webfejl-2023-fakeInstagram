export class User {
  
  
  email: string = "";
  fullName: string = "";
  id: string = "";
  userName: string = "";
  userPicture: string = "";

  constructor(obj: any = null) {
    if (obj != null){
      Object.assign(this, obj);
    }
  }

}
