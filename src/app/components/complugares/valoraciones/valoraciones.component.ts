import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LugaresService } from 'src/app/services/lugares.service';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { Valoracion } from 'src/app/interfaces/valoraciones.interface';

@Component({
  selector: 'app-valoraciones',
  templateUrl: './valoraciones.component.html',
  styleUrls: ['./valoraciones.component.css']
})
export class ValoracionesComponent implements OnInit {

  valoraciones: Valoracion[];
  faUserCircle = faUserCircle;
  faStar = faStar;
  farStar = farStar;

  arrayPaginas: any[];
  paginaSeleccionada: number;

  constructor(
    private lugaresService: LugaresService,
    private activatedRoute: ActivatedRoute
  ) {

    this.arrayPaginas = [];
    this.paginaSeleccionada = 1;
  }

  ngOnInit() {
    this.paginaSeleccionada = 1;
    this.activatedRoute.params.subscribe(async params => {
      const id = parseInt(params.lugar_id);
      const arrValoraciones = await this.lugaresService.getValoracionesByIdByPage(id, 1);
      this.valoraciones = arrValoraciones;


      // Método para obtener todos las páginas y mostrar todos los comentarios
      this.arrayPaginas = [];
      this.lugaresService.getNumPagesLugar(id)
        .then(response => {
          const numeroPaginas = response.numpaginas;
          for (let i = 1; i <= numeroPaginas; i++) {
            this.arrayPaginas.push(i);
          }
          console.log('arrayPaginas', this.arrayPaginas)
        })

    });

  }


  // Método para cambiar de página al hacer click en la paginación

  changePage(pPagina) {

    this.paginaSeleccionada = pPagina;
    this.activatedRoute.params.subscribe(async params => {
      const id = parseInt(params.lugar_id);
      const arrValoraciones = await this.lugaresService.getValoracionesByIdByPage(id, pPagina);
      console.log('arrValoracionesOnChange', arrValoraciones)
      this.valoraciones = arrValoraciones;
    });

  }

}
