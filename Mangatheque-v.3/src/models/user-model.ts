export class UserModel {
  /**
  * Properties
  */
  private email : string;
  private login : string;
  private pseudo : string;
  private userKey : string;
  private token : string;
  /**
  * Getters
  */
  get Email():string{
    return this.email;
  }
  get Login():string {
    return this.login;
  }
  get Pseudo(): string {
    return this.pseudo;
  }
  get UserKey():string{
    return this.userKey;
  }
  get Token():string{
    return this.token;
  }
  /**
  * Setters
  */
  set Email(email:string){
    this.email = email;
  }
  set Login(login:string) {
    this.login = login;
  }
  set Pseudo(pseudo:string) {
    this.pseudo = pseudo;
  }
  set UserKey(userKey:string){
    this.userKey = userKey;
  }
  set Token(token:string){
    this.token = token;
  }
  constructor(email:string,login:string,pseudo:string,userKey:string,token:string)
  {
    this.Email = email;
    this.Login = login;
    this.Pseudo = pseudo;
    this.UserKey = userKey;
    this.Token = token;
  }

}
