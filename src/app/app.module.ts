import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LugaresComponent } from './components/complugares/lugares/lugares.component';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NewlugarComponent } from './components/complugares/newlugar/newlugar.component';
import { EditlugarComponent } from './components/complugares/editlugar/editlugar.component';
import { MapalugarComponent } from './components/complugares/mapalugar/mapalugar.component';
import { VistalugarComponent } from './components/complugares/vistalugar/vistalugar.component';
import { ValoracionesComponent } from './components/complugares/valoraciones/valoraciones.component';
import { ValoracionmediaComponent } from './components/complugares/valoracionmedia/valoracionmedia.component';
import { HeaderuserComponent } from './components/compusuarios/headeruser/headeruser.component';
import { CuentaComponent } from './components/compusuarios/cuenta/cuenta.component';
import { NewComponent } from './components/compusuarios/new/new.component';
import { LoginComponent } from './components/compusuarios/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LugaresComponent,
    FooterComponent,
    HomeComponent,
    NewlugarComponent,
    EditlugarComponent,
    MapalugarComponent,
    VistalugarComponent,
    ValoracionesComponent,
    ValoracionmediaComponent,
    HeaderuserComponent,
    CuentaComponent,
    NewComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBXoe3vvdGGosbpLVZqUncQDgiW4UAbl58'
    }),
    AgmSnazzyInfoWindowModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
