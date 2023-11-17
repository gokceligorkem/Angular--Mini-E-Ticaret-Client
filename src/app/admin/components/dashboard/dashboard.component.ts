import { Component, OnInit } from '@angular/core';
import { HubUrls } from 'src/app/constants/hub-urls/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { SignalrService } from 'src/app/services/common/signalr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
constructor(private alertify:AlertifyService,private signalR:SignalrService){

}
  ngOnInit(): void {
    this.signalR.on(HubUrls.ProductHub,ReceiveFunctions.ProductAddedMessageReceiveFunction,message=>{
     this.alertify.message(message,{
      messageType:MessageType.Notify,
      position:Position.TopRight
     })
    });
    this.signalR.on(HubUrls.OrderHub,ReceiveFunctions.OrderAddedMessageReceiveFunction,message=>{
      this.alertify.message(message,{
        messageType:MessageType.Notify,
        position:Position.TopRight
       })
    });
  }
m(){
  this.alertify.message("Merhaba",{
    messageType:MessageType.Success,
    delay:5,
    position:Position.BottomLeft,


  })
}
d(){
  this.alertify.dismiss();
}
}
