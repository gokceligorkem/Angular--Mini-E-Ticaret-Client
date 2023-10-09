import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './ui/components/login/login.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule,GoogleSigninButtonModule, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>localStorage.getItem('accessToken'),
        allowedDomains:["localhost:7034"]
      }
    }),
    SocialLoginModule,GoogleSigninButtonModule
    
     
  ],
  providers: [{provide:"baseUrl",useValue:"https://localhost:7034/api",multi:true},
  {
    provide: "SocialAuthServiceConfig",
    useValue: {
      autoLogin: false,
      providers: [
        {
          id:FacebookLoginProvider.PROVIDER_ID,
          provider:new FacebookLoginProvider("3451899401741648")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("736728969643-1dft42a23f8hg798vrq9mok7apu936fk.apps.googleusercontent.com")
        }
     
      ],
      onError: err => console.log(err)
    } as SocialAuthServiceConfig
  },
  {provide:HTTP_INTERCEPTORS,useClass:HttpErrorHandlerInterceptorService,multi:true}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
