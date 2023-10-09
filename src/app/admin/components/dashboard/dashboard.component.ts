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
signalR.start(HubUrls.ProductHub)
}
  ngOnInit(): void {
    // this.signalR.on(ReceiveFunctions.ProductAddedMessageReceiveFunction,message=>{
    //   alert(message);
    // });
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
