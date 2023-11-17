import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthorizeMenuComponent } from './authorize-menu/authorize-menu.component';
import { AuthorizeMenuModule } from './authorize-menu/authorize-menu.module';
import { RolepageModule } from './rolepage/rolepage.module';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';
import { UsersModule } from './users/users.module';




@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ProductsModule,
    OrderModule,
    CustomerModule,
    DashboardModule,
    AuthorizeMenuModule,
    RolepageModule,
    UsersModule

  ]
})
export class ComponentsModule { }
