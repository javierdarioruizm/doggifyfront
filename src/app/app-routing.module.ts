import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditlugarComponent } from './components/complugares/editlugar/editlugar.component';
import { LugaresComponent } from './components/complugares/lugares/lugares.component';
import { MapalugarComponent } from './components/complugares/mapalugar/mapalugar.component';
import { NewlugarComponent } from './components/complugares/newlugar/newlugar.component';
import { ValoracionesComponent } from './components/complugares/valoraciones/valoraciones.component';
import { VistalugarComponent } from './components/complugares/vistalugar/vistalugar.component';
import { ComentariosComponent } from './components/compusuarios/comentarios/comentarios.component';
import { CuentaComponent } from './components/compusuarios/cuenta/cuenta.component';
import { FavoritosComponent } from './components/compusuarios/favoritos/favoritos.component';
import { LoginComponent } from './components/compusuarios/login/login.component';
import { NewComponent } from './components/compusuarios/new/new.component';
import { PerfilComponent } from './components/compusuarios/perfil/perfil.component';
import { HeaderuserComponent } from './components/headeruser/headeruser.component';
import { HomeComponent } from './components/home/home.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'lugares', component: LugaresComponent },
  { path: 'lugares/:lugar_id', component: VistalugarComponent },
  { path: 'nuevolugar', component: NewlugarComponent, canActivate: [LoginGuard] },
  { path: 'lugares/:lugar_id/edit', component: EditlugarComponent, canActivate: [LoginGuard] },
  { path: 'valoraciones/:lugar_id', component: ValoracionesComponent },
  { path: 'mapa', component: MapalugarComponent },
  { path: 'lugares/:lugar_id/comentarios', component: ComentariosComponent, canActivate: [LoginGuard] },

  { path: 'registro', component: NewComponent, },
  { path: 'login', component: LoginComponent, },
  { path: 'user', component: CuentaComponent, canActivate: [LoginGuard] },
  { path: 'user', component: HeaderuserComponent, canActivate: [LoginGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [LoginGuard] },
  { path: 'favoritos', component: FavoritosComponent, canActivate: [LoginGuard] },
  { path: '**', redirectTo: 'home' }

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
