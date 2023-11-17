import {  Component, ViewChild } from '@angular/core';
import { AuthService } from './services/common/authservice.service';
import { ToastrService } from 'ngx-toastr';
import {
  CustomerToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './services/ui/customer-toastr.service';
import { Router } from '@angular/router';
import { HttpClientService } from './services/common/http-client.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(DynamicLoadComponentDirective, { static: true })
  dynamaicComponentDirective: DynamicLoadComponentDirective;
  faShoppingCart = faShoppingCart;
  constructor(
    public authService: AuthService,
    private toastrService: CustomerToastrService,
    private router: Router,
    httpClientService: HttpClientService,
    private dynamicloadComponentService: DynamicLoadComponentService
  ) {
    authService.identityCheck();
  }

  signOut() {
    localStorage.removeItem('accessToken');
    this.authService.identityCheck();
    this.router.navigate(['']);
    this.toastrService.message('Oturum kapatılmıştır.', 'Çıkış  Yapıldı.', {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopRight,
    });
  }
  loadComponent(){
this.dynamicloadComponentService.loadComponent(ComponentType.BasketsComponent,this.dynamaicComponentDirective.viewContainerRef)
}

}
