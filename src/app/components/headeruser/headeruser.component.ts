import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-headeruser',
  templateUrl: './headeruser.component.html',
  styleUrls: ['./headeruser.component.css']
})
export class HeaderuserComponent implements OnInit {

  icono: string;
  enlace: string;
  estado: boolean;
  menuCerrado: boolean;
  menuAbierto: boolean;
  faTimes = faTimes;
  faBars = faBars;
  faUserCircle = faUserCircle;
  menu: boolean;
  faSearch = faSearch;
  farHeart = farHeart;


  constructor(private router: Router) {

    this.icono = 'unclicked';
    this.enlace = 'enlaceunclicked';
    this.menuCerrado = true;
    this.menuAbierto = false;
    this.menu = false;
  }

  ngOnInit(): void {

    console.log(this.icono);
    console.log(this.menu);
  }





  onClickInicio() {
    if (this.icono === 'clicked') {
      this.icono = 'unclicked';
      this.menu = !this.menu

    } else {
      this.icono = 'clicked';
      this.menu = !this.menu
    }
    setTimeout(() => this.router.navigate(['/']), 100);
    setTimeout(() => window.location.reload(), 100);
  }

  onClickLugares() {
    if (this.icono === 'clicked') {
      this.icono = 'unclicked';
      this.menu = !this.menu

    } else {
      this.icono = 'clicked';
      this.menu = !this.menu
    }
    setTimeout(() => this.router.navigate(['/lugares']), 50);
    setTimeout(() => window.location.reload(), 50);

  }

  onClickFavoritos() {
    if (this.icono === 'clicked') {
      this.icono = 'unclicked';
      this.menu = !this.menu

    } else {
      this.icono = 'clicked';
      this.menu = !this.menu
    }
    setTimeout(() => this.router.navigate(['/favoritos']), 50);
    setTimeout(() => window.location.reload(), 50);

  }

  onClickTuCuenta() {
    // if (this.icono === 'clicked') {
    //   this.icono = 'unclicked';
    //   this.menu = !this.menu

    // } else {
    //   this.icono = 'clicked';
    //   this.menu = !this.menu
    // }
    setTimeout(() => this.router.navigate(['/user']), 100);
    setTimeout(() => window.location.reload(), 100);
  }

  onClick() {

    if (this.icono === 'unclicked') {
      this.icono = 'clicked';
      this.menu = !this.menu

    } else {
      this.icono = 'unclicked';
      this.menu = !this.menu
    }
    console.log(this.icono);
    console.log(this.menu);
  }

  onClickEnlace() {
    if (this.icono === 'clicked') {
      this.icono = 'unclicked';
      this.menu = !this.menu

    } else {
      this.icono = 'clicked';
      this.menu = !this.menu
    }

  }

}
