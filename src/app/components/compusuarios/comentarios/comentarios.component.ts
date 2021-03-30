import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { LugaresService } from 'src/app/services/lugares.service';
import { Lugar } from 'src/app/interfaces/lugares.interface';

declare var Swal;

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  lugar: Lugar;
  listaImagenes: [];
  formComentarios: FormGroup;
  faStar = faStar;

  constructor(
    private usuariosService: UsuariosService,
    private lugaresService: LugaresService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef
  ) {

    this.formComentarios = new FormGroup({


      valoracion: new FormControl(),
      comentario: new FormControl(),
    });


  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(async params => {
      const id = parseInt(params.lugar_id);
      this.lugar = await this.lugaresService.getLugarbyId(id);
      // this.lugar = arrLugar;
      this.lugar.arrimagenes = this.lugar.imagenes.split(",");
      this.listaImagenes = this.lugar.arrimagenes;


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

  async onSubmit() {
    console.log(this.formComentarios.value);
    const response = await this.lugaresService.insertComentario(this.lugar.id, this.formComentarios.value);
    console.log(response);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Muchas gracias por tu valoración',
      showConfirmButton: false,
      timer: 2000
    })
    setTimeout(() => this.router.navigate(['lugares', this.lugar.id]), 2500);
  }



}
