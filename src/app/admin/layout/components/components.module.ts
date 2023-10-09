import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';





@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ]
})
export class ComponentsModule { }
