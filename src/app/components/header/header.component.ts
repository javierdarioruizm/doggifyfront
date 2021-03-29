import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  icono: string;
  enlace: string;
  estado: boolean;
  menuCerrado: boolean;
  menuAbierto: boolean;
  faTimes = faTimes;
  faBars = faBars;
  faUserCircle = faUserCircle;
  menu: boolean;


  constructor() {

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
    setTimeout(() => window.location.reload(), 20);

  }





}

