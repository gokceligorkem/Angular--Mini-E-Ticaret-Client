import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
constructor(@Inject("baseSignalRUrl") private baseSignalRUrl:string){}

start(hubUrl:string){
  hubUrl=this.baseSignalRUrl+hubUrl

  const builder:HubConnectionBuilder=new HubConnectionBuilder();
  const hubConnection:HubConnection=builder.withUrl(hubUrl)
  .withAutomaticReconnect().build();
  hubConnection.start()
  .then(()=>console.log("Connected"))
  .catch(error=>setTimeout(()=>this.start(hubUrl),2000));

  hubConnection.onreconnecting(error=>console.log("Reconnecting"));
  hubConnection.onreconnected(connectionId=>console.log("Reconnected"));
  hubConnection.onclose(error=>console.log("Close Reconnection"))

return hubConnection
  }




invoke(hubUrl:string,procedurName:string,message:any,successCallBack?:(value)=>void,errorCallBack?:(error)=>void){
this.start(hubUrl).invoke(procedurName,message)
.then(successCallBack)
.catch(errorCallBack)
  }



on(hubUrl:string,produreName:string,callBack:(...message:any)=>void){
this.start(hubUrl).on(produreName,callBack);
  }
}
