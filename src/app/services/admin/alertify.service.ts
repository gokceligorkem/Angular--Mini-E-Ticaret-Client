import { Injectable } from '@angular/core';
declare var alertify:any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
// message(message:string,messageType:MessageType,position:Position,delay:number=4,dismissOthers:boolean=false)
message(message:string,options:Partial<AlertyfyOptions>)
{
 const msg= alertify[options.messageType](message)
  alertify.set('notifier','position',options.position)
  alertify.set('notifier','delay',options.delay)

  if(options.dismissOther)
  {
    msg.dismissOthers();
  }
}

dismiss(){
  alertify.dismissAll();
}
}
export class AlertyfyOptions {
  messageType: MessageType=MessageType.Message;
  position: Position=Position.BottomRight;
  delay: number=4;
  dismissOther: boolean=false;
}
export enum MessageType{
  Error="error",
  Message="message",
  Notify="notify",
  Success="success",
  Warning="warning"
}

export enum Position{
  Topcenter="top-center",
  TopRight="top-right",
  TopLeft="top-left",
  BottomCenter="bottom-center",
  BottomLeft="bottom-left",
  BottomRight="bottom-right"
  
}

