import { Component, OnInit, ViewChild } from '@angular/core';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';

@Component({
  selector: 'app-rolepage',
  templateUrl: './rolepage.component.html',
  styleUrls: ['./rolepage.component.scss']
})
export class RolepageComponent implements OnInit  {
  constructor(){}
  ngOnInit(): void {
  }
@ViewChild(ListComponent) listComponent:ListComponent;
createdRole(createdRole: string) {

  this.listComponent.getRoles();
}
}
