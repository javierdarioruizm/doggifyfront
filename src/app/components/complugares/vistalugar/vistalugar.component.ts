import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lugar } from 'src/app/interfaces/lugares.interface';
import { LugaresService } from 'src/app/services/lugares.service';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FavoritosService } from 'src/app/services/favoritos.service';


@Component({
  selector: 'app-vistalugar',
  templateUrl: './vistalugar.component.html',
  styleUrls: ['./vistalugar.component.css']
})
export class VistalugarComponent implements OnInit {

  lugar: Lugar;
  lugares: Lugar[];
  favoritos: Lugar[];


  latitud: number;
  longitud: number;
  faPhoneAlt = faPhoneAlt;
  faEnvelope = faEnvelope;
  faMapMarkerAlt = faMapMarkerAlt;
  faHeart = faHeart;
  farHeart = farHeart;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  listaImagenes: [];
  imagenActual: number;
  corazon: string;


  constructor(
    private lugaresService: LugaresService,
    private favoritosService: FavoritosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    this.imagenActual = 0;


  }


  ngOnInit() {

    this.activatedRoute.params.subscribe(async params => {
      const id = parseInt(params.lugar_id);
      this.lugar = await this.lugaresService.getLugarbyId(id);
      // this.lugar = arrLugar;
      this.lugar.arrimagenes = this.lugar.imagenes.split(",");
      this.listaImagenes = this.lugar.arrimagenes;
    });

    // Método para recuperar los favoritos del usuario


    this.favoritosService.getFavoritosByUser()
      .then(response => {
        this.favoritos = response;
        console.log('FAVORITOS', this.favoritos)

        for (let favorito of this.favoritos) {

          const encuentra = this.favoritos.find(favorito => favorito.id === this.lugar.id);
          if (encuentra) {
            console.log('encuentra', this.lugar.nombre)
            this.lugar.favorito = true;
          }
          else {
            console.log('NoEncuentra', this.lugar.nombre)
            this.lugar.favorito = false;

          }



        }
      })
      .catch(error => {
        console.log(error);
      });

  }


  // Método para cambiar las imágenes de la galería

  onClick(siguiente) {
    if (siguiente) {

      this.imagenActual = (this.imagenActual >= this.listaImagenes.length - 1) ? 0 : this.imagenActual + 1;

    } else {

      this.imagenActual = (this.imagenActual <= 0) ? this.listaImagenes.length - 1 : this.imagenActual - 1;

    }

  }



  // Método para guardar el lugar en favoritos

  onHeart(pId) {

    if (localStorage.getItem('tokendoggify')) {
      console.log('elegidoAlEntrar', pId)
      console.log('lugar.favorito', this.lugar.favorito)
      if (this.lugar.favorito == false) {

        this.favoritosService.addFavoritosById(pId)
          .then(response => {
            console.log(response);
            this.lugar.favorito = true;
            console.log('lugar.favorito', this.lugar.favorito)
          })
          .catch(error => {
            console.log(error);
          });

      } else {
        console.log('elegidoParaBorrar', pId)
        console.log('corazonBorrar', this.corazon)
        console.log('lugar.favorito', this.lugar.favorito)
        this.favoritosService.deleteFavoritosById(pId)
          .then(response => {
            console.log(response);
            this.lugar.favorito = false;
            console.log('lugar.favorito', this.lugar.favorito)
          })
          .catch(error => {
            console.log(error);
          });
      }


    } else {
      setTimeout(() => this.router.navigate(['/registro']), 300);

    }
  }


  // onHeart(pId) {

  //   if (localStorage.getItem('tokendoggify')) {
  // console.log('elegido', pId)
  // console.log('corazon', this.corazon)
  //     if (this.corazon == 'unclicked') {

  //       this.favoritosService.addFavoritosById(pId)
  //         .then(response => {

  //           console.log(response);
  //           this.corazon = 'clicked';
  //           this.favorito = true;
  //           console.log('corazon', this.corazon)
  //         })
  //         .catch(error => {
  //           console.log(error);
  //         });

  //     } else {
  // console.log('elegido', pId)
  // console.log('corazon', this.corazon)
  //       this.favoritosService.deleteFavoritosById(pId)
  //         .then(response => {
  //           console.log(response);
  //           this.corazon = 'unclicked';
  //           this.favorito = false;

  //         })
  //         .catch(error => {
  //           console.log(error);
  //         });
  //     }


  //   } else {
  //     setTimeout(() => this.router.navigate(['/registro']), 300);

  //   }
  // }




  // Método para escribir comentarios

  OnComentarios(pId) {

    if (localStorage.getItem('tokendoggify')) {
      this.router.navigate(['lugares', pId, 'comentarios'])
    } else {

      setTimeout(() => this.router.navigate(['/registro']), 300);
    }

  }



}

