import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { HomeComponent } from './components/home/home.component';

import { LugaresComponent } from './components/complugares/lugares/lugares.component';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { MapalugarComponent } from './components/complugares/mapalugar/mapalugar.component';

import { NewlugarComponent } from './components/complugares/newlugar/newlugar.component';
import { EditlugarComponent } from './components/complugares/editlugar/editlugar.component';
import { VistalugarComponent } from './components/complugares/vistalugar/vistalugar.component';
import { ValoracionmediaComponent } from './components/complugares/valoracionmedia/valoracionmedia.component';
import { ValoracionesComponent } from './components/complugares/valoraciones/valoraciones.component';



import { NewComponent } from './components/compusuarios/new/new.component';
import { LoginComponent } from './components/compusuarios/login/login.component';
import { CuentaComponent } from './components/compusuarios/cuenta/cuenta.component';
import { PerfilComponent } from './components/compusuarios/perfil/perfil.component';
import { FavoritosComponent } from './components/compusuarios/favoritos/favoritos.component';
import { ComentariosComponent } from './components/compusuarios/comentarios/comentarios.component';

import { HeaderuserComponent } from './components/headeruser/headeruser.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LugaresComponent,
    NewlugarComponent,
    EditlugarComponent,
    MapalugarComponent,
    VistalugarComponent,
    ValoracionmediaComponent,
    ValoracionesComponent,

    HeaderuserComponent,
    LoginComponent,
    NewComponent,
    PerfilComponent,
    CuentaComponent,
    FavoritosComponent,
    ComentariosComponent,


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
