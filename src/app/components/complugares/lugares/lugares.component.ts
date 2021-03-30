import { Component, OnInit } from '@angular/core';
import { Lugar } from 'src/app/interfaces/lugares.interface';
import { LugaresService } from 'src/app/services/lugares.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
// import { GaleriaService } from 'src/app/services/galeria.service';
import { FavoritosService } from 'src/app/services/favoritos.service';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css']
})
export class LugaresComponent implements OnInit {

  lugares: Lugar[];
  favoritos: Lugar[];
  favorito: number;
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
    // private galeriaService: GaleriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    this.latitud = 40.431695;
    this.longitud = -3.694059;

    this.imagenActual = 0;
    this.arrayPaginas = [];

    this.categoriaSeleccionada = "todas";
    this.corazon = "unclicked";

  }


  async ngOnInit() {

    // Método para obtener todos las páginas y mostrar todos lugares

    this.lugaresService.getPages()
      .then(response => {
        const numeroPaginas = response.numpaginas;
        for (let i = 1; i <= numeroPaginas; i++) {
          this.arrayPaginas.push(i);
        }

      })


    // Método para mostrar todos los lugares por página al inicio

    const response = await this.lugaresService.getAllByPage(1);
    const responsefavoritos = await this.favoritosService.getFavoritosByUser();
    console.log(response)
    this.lugares = response;
    this.favoritos = responsefavoritos || [];
    this.numeroLugares = this.lugares.length;
    this.paginaseleccionada = 1;
    for (let lugar of this.lugares) {
      console.log(lugar.imagenes)
      lugar.arrimagenes = lugar.imagenes.split(",");
      console.log(lugar.arrimagenes)
      this.listaImagenes = lugar.arrimagenes;
      const encuentra = this.favoritos.find(favorito => favorito.id === lugar.id);
      if (encuentra) {
        console.log('encuentra', lugar.nombre)
        lugar.favorito = true;
      }
    }


    // Método para obtener todas las categorías

    this.lugaresService.getAllCategorias()
      .then(response => {
        this.listaCategorias = response;

      })
      .catch(error => {
        console.log(error);
      });


  }



  // Método para mostrar los lugares al cambiar de categoria

  onChange($event) {

    this.categoriaSeleccionada = $event.target.value;

    if ($event.target.value === 'todas') {

      // Método para obtener todos las páginas para mostrar todos lugares

      this.arrayPaginas = [];
      this.lugaresService.getPages()
        .then(response => {
          const numeroPaginas = response.numpaginas;
          for (let i = 1; i <= numeroPaginas; i++) {
            this.arrayPaginas.push(i);
          }
        })
        .catch(error => {
          console.log(error);
        });

      // Método para mostrar los lugares por página

      this.lugaresService.getAllByPage(1)
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

      this.lugaresService.getNumPagesCategoria($event.target.value)
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

      this.lugaresService.getByCategoriaByPage($event.target.value, 1)
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
      this.lugaresService.getAllByPage(pPagina)
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

      this.lugaresService.getByCategoriaByPage(this.categoriaSeleccionada, pPagina)
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

  onHeart(pId) {

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


  }



}

  // ngAfterViewInit() {
  //   navigator.geolocation.getCurrentPosition(position => {
  //     this.latitud = position.coords.latitude;
  //     this.longitud = position.coords.longitude;
  //   });

  // }




