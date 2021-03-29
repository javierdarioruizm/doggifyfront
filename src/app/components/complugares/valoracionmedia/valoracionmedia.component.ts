import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lugar } from 'src/app/interfaces/lugares.interface';
import { LugaresService } from 'src/app/services/lugares.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-valoracionmedia',
  templateUrl: './valoracionmedia.component.html',
  styleUrls: ['./valoracionmedia.component.css']
})
export class ValoracionmediaComponent implements OnInit {

  lugar: Lugar;
  faStar = faStar;
  farStar = farStar;

  constructor(
    private lugaresService: LugaresService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(async params => {
      // params SIEMPRE me devuelve los valores en formato STRING

      const id = parseInt(params.lugar_id);
      const arrLugar = await this.lugaresService.getLugarbyId(id);
      this.lugar = arrLugar;

    });

  }

}
