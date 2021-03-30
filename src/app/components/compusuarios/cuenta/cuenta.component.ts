import { Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';


import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/interfaces/usuarios.interface';

declare var Swal;

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css'],

})
export class CuentaComponent implements OnInit {

  faSignOutAlt = faSignOutAlt;
  faHeart = faHeart;
  farHeart = farHeart;
  faUserCircle = faUserCircle;
  faSlidersH = faSlidersH;
  faUserAlt = faUserAlt;

  usuario: Usuario;


  constructor(
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef

  ) { }

  ngOnInit(): void {



    this.activatedRoute.params.subscribe(async params => {
      const id = parseInt(params.idUsuario);
      const arrUsuario = await this.usuariosService.getUsuariobyId();
      this.usuario = arrUsuario;
      console.log(this.usuario)

    });

  }

  ngAfterViewInit() {
    // this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'rgb(239, 242, 247)';

    this.elementRef.nativeElement.ownerDocument.body.style.backgroundImage = 'url("../../../assets/images/fondodoggify.jpg")';
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundSize = 'cover';
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundRepeat = 'no-repeat';
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundPosition = '50% 50%';
    // this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'rgb(175, 175, 175)';
    // this.elementRef.nativeElement.ownerDocument.body.style.backgroundBlendMode = 'multiply';
    this.elementRef.nativeElement.ownerDocument.body.style.height = 'auto';
    this.elementRef.nativeElement.ownerDocument.body.style.zIndex = '-1';


  }


  onClickMiPerfil() {
    setTimeout(() => this.router.navigate(['perfil']), 100);
    // setTimeout(() => window.location.reload(), 100);
  }

  onClickFavoritos() {
    setTimeout(() => this.router.navigate(['favoritos']), 100);
    setTimeout(() => window.location.reload(), 100);
  }

  onClickAjustes() {
    setTimeout(() => this.router.navigate(['/']), 200);
    setTimeout(() => window.location.reload(), 400);
  }


  onClickLogOut() {
    localStorage.removeItem('tokendoggify');
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Hasta pronto ' + this.usuario.nombre,
      showConfirmButton: false,
      timer: 2000
    })
    setTimeout(() => this.router.navigate(['/']), 2200);
    setTimeout(() => window.location.reload(), 2200);

  }

}
