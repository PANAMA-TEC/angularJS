import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//importacion de servicio necesario para leer bases de datos externas
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadersComponent } from './modules/headers/headers.component';
import { HeaderPromotionComponent } from './modules/header-promotion/header-promotion.component';
import { HeaderMobileComponent } from './modules/header-mobile/header-mobile.component';
import { NewlettersComponent } from './modules/newletters/newletters.component';
import { FooterComponent } from './modules/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent,
    HeaderPromotionComponent,
    HeaderMobileComponent,
    NewlettersComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   
    //importacion de servicio necesario para leer bases de datos externas
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
