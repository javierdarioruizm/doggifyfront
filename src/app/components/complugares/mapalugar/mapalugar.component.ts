import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lugar } from 'src/app/interfaces/lugares.interface';
import { LugaresService } from 'src/app/services/lugares.service';

@Component({
  selector: 'app-mapalugar',
  templateUrl: './mapalugar.component.html',
  styleUrls: ['./mapalugar.component.css']
})
export class MapalugarComponent implements OnInit {

  latitud: number;
  longitud: number;
  lugar: Lugar;


  constructor(
    private lugaresService: LugaresService,
    private activatedRoute: ActivatedRoute) {

    this.latitud = 41;
    this.longitud = -3;
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(async params => {

      const id = parseInt(params.lugar_id);
      const arrLugar = await this.lugaresService.getLugarbyId(id);
      this.lugar = arrLugar;
      // const fotoArray = lugar.imagenes.split(",");
      // lugar.arrimagenes = fotoArray;

    });

  }

  ngAfterViewInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.latitud = position.coords.latitude;
      this.longitud = position.coords.longitude;
    });


  }

}
