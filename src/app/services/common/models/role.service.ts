import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpService:HttpClientService) { }


 async getRoles(page:number,size:number,successCallBack?:()=>void,errorCallBack?:(error)=>void){
   const observable:Observable<any>= this.httpService.get({
      controller:"roles",
      queryString:`page=${page}&size=${size}`
    })
    const promiseData=firstValueFrom(observable)
    promiseData.then(successCallBack).catch(errorCallBack);
    return await promiseData ; 
  }
  async create(name:string,successCallBack?:()=>void,errorCallBack?:(error)=>void){
    const observable:Observable<any>= this.httpService.post({
      controller:"roles"
    },{name:name});
    const promiseData= firstValueFrom(observable)
    promiseData.then(successCallBack).catch(errorCallBack);
   return await promiseData as {succeeded:boolean}; 
  } 
}

