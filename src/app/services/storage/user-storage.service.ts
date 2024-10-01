import { Injectable } from '@angular/core';
import { retry } from 'rxjs';

const TOKEN='ecom-token';
const USER='ecom-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public saveToken(token : string) :void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
  }

  public saveUser(user):void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER,JSON.stringify(user));
  }

  static getToken():string{
    return localStorage.getItem(TOKEN);
  }


  static getUser():any{
    console.log(JSON.parse(localStorage.getItem(USER)));
    
    return JSON.parse(localStorage.getItem(USER));
  }

  static getUserId():string
{
   const user=this.getUser();
   if(user==null){
    return '';
   }
   console.log(user.userId);
   
   return user.userId;
}
static getUserRole():string
{
   const user=this.getUser();
   if(user==null){
    return '';
   }
   return user.role;
}

static isAdminLoggedIn():boolean{
  if(this.getToken === null){
    return false;
  }
  const role:string=this.getUserRole();
  console.log(role);
  
  return role == 'ADMIN';
}

static isCustomerLoggedIn():boolean{
  if(this.getToken === null){
    return false;
  }
  const role:string=this.getUserRole();
  return role == 'CUSTOMER';
}

static signOut():void{
  window.localStorage.removeItem(TOKEN);
  window.localStorage.removeItem(USER);
}
}
