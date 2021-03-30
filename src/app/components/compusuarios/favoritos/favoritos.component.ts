import { Component, ElementRef, OnInit } from '@angular/core';
import { Lugar } from 'src/app/interfaces/lugares.interface';
import { LugaresService } from 'src/app/services/lugares.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FavoritosService } from 'src/app/services/favoritos.service';

declare var Swal;

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  lugares: Lugar[];
  favoritos: Lugar[];
  favorito: boolean;
  faStar = faStar;
  farStar = farStar;
  farHeart = farHeart;
  numeroLugares: number;

  listaImagenes: any;
  imagenActual: number;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  latitud: number;
  longitud: number;

  listaCategorias: any;
  arrayPaginas: any[];

  paginaseleccionada: number;
  categoriaSeleccionada: string;
  corazon: string;


  constructor(
    private lugaresService: LugaresService,
    private favoritosService: FavoritosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef
  ) {

    this.latitud = 40.431695;
    this.longitud = -3.694059;

    this.imagenActual = 0;
    this.arrayPaginas = [];

    this.categoriaSeleccionada = "todas";

  }


  ngOnInit(): void {

    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fff';

    // Método para obtener todos las páginas y mostrar todos los favoritos de un usuario

    this.favoritosService.getNumPagesFavoritos()
      .then(response => {
        const numeroPaginas = response.numpaginas;
        for (let i = 1; i <= numeroPaginas; i++) {
          this.arrayPaginas.push(i);
        }
        console.log('NUM PÁGINAS DE FAVORITOS:', this.arrayPaginas)
        console.log('NUM PÁGINAS DE FAVORITOS LENGTH:', this.arrayPaginas.length)

        if (this.arrayPaginas.length == 0) {
          console.log('NO FAVORITOS', this.arrayPaginas.length)
          Swal.fire({
            // position: 'center',
            icon: 'info',
            title: 'No has guardado ningún favorito',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['user']);
        }
      })


    // Método para mostrar todos los favoritos por página al inicio

    this.favoritosService.getFavoritosByPage(1)
      .then(response => {
        this.lugares = response;
        console.log('FAVORITOS EN PAGINA 1:', this.lugares)
        this.numeroLugares = this.lugares.length;
        this.paginaseleccionada = 1;
        for (let lugar of this.lugares) {
          console.log(lugar.imagenes)
          lugar.arrimagenes = lugar.imagenes.split(",");
          console.log(lugar.arrimagenes)
          this.listaImagenes = lugar.arrimagenes;
        }
      })
      .catch(error => {
        console.log(error);
      });






    // Método para obtener todas las categorías de los favoritos

    this.favoritosService.getFavoritosCategorias()
      .then(response => {
        this.listaCategorias = response;
        console.log('LISTA DE CATEGORIAS DE FAVORITOS:', this.listaCategorias)
      })
      .catch(error => {
        console.log(error);
      });






  }




  // Método para mostrar los favoritos al cambiar de categoria

  onChange($event) {

    this.categoriaSeleccionada = $event.target.value;

    if ($event.target.value === 'todas') {

      // Método para obtener todos las páginas para mostrar todos lugares

      this.arrayPaginas = [];
      this.favoritosService.getNumPagesFavoritos()
        .then(response => {
          const numeroPaginas = response.numpaginas;
          for (let i = 1; i <= numeroPaginas; i++) {
            this.arrayPaginas.push(i);
          }
        })
        .catch(error => {
          console.log(error);
        });

      // Método para mostrar los favoritos por página

      this.favoritosService.getFavoritosByPage(1)
        .then(response => {
          this.lugares = response;
          this.numeroLugares = this.lugares.length;
          this.paginaseleccionada = 1;
          for (let lugar of this.lugares) {
            lugar.arrimagenes = lugar.imagenes.split(",");
            this.listaImagenes = lugar.arrimagenes;
          }
        })
        .catch(error => {
          console.log(error);
        });


    } else {

      // Método para obtener todos las páginas de esa categoría

      this.arrayPaginas = [];

      this.favoritosService.getNumPagesFavoritosByCategoria($event.target.value)
        .then(response => {
          const numeroPaginas = response.numpaginas;
          for (let i = 1; i <= numeroPaginas; i++) {
            this.arrayPaginas.push(i);
          }
        })
        .catch(error => {
          console.log(error);
        });

      // Método para mostrar las categorias por página

      this.favoritosService.getFavoritosByCategoriaByPage($event.target.value, 1)
        .then(response => {
          this.lugares = response;
          this.numeroLugares = this.lugares.length;
          this.paginaseleccionada = 1;
          for (let lugar of this.lugares) {
            lugar.arrimagenes = lugar.imagenes.split(",");
            this.listaImagenes = lugar.arrimagenes;
          }
        })
        .catch(error => {
          console.log(error);
        });

    }
  }


  // Método para cambiar de página al hacer click en la paginación

  changePage(pPagina) {

    this.paginaseleccionada = pPagina;
    if (this.categoriaSeleccionada == "todas") {
      this.favoritosService.getFavoritosByPage(pPagina)
        .then(response => {
          this.lugares = response;
          this.numeroLugares = this.lugares.length;
          for (let lugar of this.lugares) {
            lugar.arrimagenes = lugar.imagenes.split(",");
            this.listaImagenes = lugar.arrimagenes;
          }
        })
        .catch(error => {
          console.log(error);
        });

    } else {

      this.favoritosService.getFavoritosByCategoriaByPage(this.categoriaSeleccionada, pPagina)
        .then(response => {
          this.lugares = response;
          this.numeroLugares = this.lugares.length;
          for (let lugar of this.lugares) {
            lugar.arrimagenes = lugar.imagenes.split(",");
            this.listaImagenes = lugar.arrimagenes;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }

  }


  // Método para desplazarse por la galería de imágenes

  onClick(siguiente, valorActual, miArrayImagenes) {

    if (siguiente) {
      valorActual = (valorActual <= miArrayImagenes.length) ? valorActual + 1 : 0

    } else {
      valorActual = (valorActual >= 0) ? valorActual - 1 : miArrayImagenes.length

    }
    this.imagenActual = valorActual;

  }

  // onClick(siguiente) {
  //   if (siguiente) {

  //     this.imagenActual = (this.imagenActual >= this.listaImagenes.length - 1) ? 0 : this.imagenActual + 1;

  //   } else {

  //     this.imagenActual = (this.imagenActual <= 0) ? this.listaImagenes.length - 1 : this.imagenActual - 1;

  //   }

  // }

  // Método para mostrar la vista de un lugar

  getLugar(pId) {
    this.router.navigate(['lugares', pId]);

  }


  // ngAfterViewInit() {
  //   navigator.geolocation.getCurrentPosition(position => {
  //     this.latitud = position.coords.latitude;
  //     this.longitud = position.coords.longitude;
  //   });

  // }


  // Método para guardar el lugar en favoritos

  onHeart(pId) {

    if (localStorage.getItem('tokendoggify')) {

      if (this.corazon === 'unclicked') {

        this.favoritosService.addFavoritosById(pId)
          .then(response => {
            // this.lugar = response;
            console.log(response);
            this.corazon = 'clicked';

          })
          .catch(error => {
            console.log(error);
          });

      } else {

        this.favoritosService.deleteFavoritosById(pId)
          .then(response => {
            console.log(response);
            this.corazon = 'unclicked';

          })
          .catch(error => {
            console.log(error);
          });
      }


    } else {
      setTimeout(() => this.router.navigate(['/registro']), 300);

    }
  }


}
