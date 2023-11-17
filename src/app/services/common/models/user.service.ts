import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { CreateUser } from 'src/app/contracts/user/createuser';
import { Observable, firstValueFrom } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/token/tokenresponse';
import {
  CustomerToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../ui/customer-toastr.service';
import { SocialUser } from '@abacritt/angularx-social-login';
import { List_User } from 'src/app/contracts/user/listuser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClientService: HttpClientService,
    private toastrService: CustomerToastrService
  ) {}

  async create(user: User): Promise<CreateUser> {
    const observable: Observable<CreateUser | User> =
      this.httpClientService.post<CreateUser | User>(
        {
          controller: 'users',
        },
        user
      );
    return (await firstValueFrom(observable)) as CreateUser;
  }
  async updatePassword(userId: string, resetToken: string, password: string, passwordConfirm: string, successCallBack?: () => void, errorCallBack?: (error) => void) {
    const observable: Observable<any> = this.httpClientService.post({
      action: "update-password",
      controller: "users"
    }, {
      userId: userId,
      resetToken: resetToken,
      password: password,
      passwordConfirm: passwordConfirm
    });

    const promiseData: Promise<any> = firstValueFrom(observable);
    promiseData.then(value => successCallBack()).catch(error => errorCallBack(error));
    await promiseData;
  }

  async getAllUsers(page:number=0,size:number=5,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void)
  :Promise<{totalUsersCount:number,users:List_User[]}>{
    const observable:Observable<{totalUsersCount:number,users:List_User[]}>= this.httpClientService.get({
      controller:"users",
      queryString:`page=${page}&size=${size}`
    })
    const promiseData=firstValueFrom(observable);
    promiseData.then(value=>successCallBack()).catch(error=>errorCallBack(error))
    return await promiseData;
  }
  async assignRoleToUser(id:string,roles:string[],successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void){
    const observable:Observable<any>=this.httpClientService.post({
      controller:"users",
      action:"assign-role-to-user"
    },{
      userId:id,
      roles:roles
    })
   const promiseData= firstValueFrom(observable);
   promiseData.then(value=>successCallBack()).catch(error=>errorCallBack(error))
     await promiseData;
  }

  async   getRolesToUser(userId:string,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<string[]>{
    const observable:Observable<{userRoles:string[]}>=this.httpClientService.get({
      controller:"users",
      action:"get-roles-to-user"
    }, userId)
    const promiseData= firstValueFrom(observable);
   promiseData.then(value=>successCallBack()).catch(error=>errorCallBack(error))
    return (await promiseData).userRoles;
  }
}
