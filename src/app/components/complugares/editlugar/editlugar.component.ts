import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Lugar } from 'src/app/interfaces/lugares.interface';
import { LugaresService } from 'src/app/services/lugares.service';


declare var Swal;




@Component({
  selector: 'app-editlugar',
  templateUrl: './editlugar.component.html',
  styleUrls: ['./editlugar.component.css']
})
export class EditlugarComponent implements OnInit {

  edicionLugares: FormGroup;
  files;
  lugar: Lugar;

  constructor(
    private lugaresService: LugaresService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {


  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(async params => {
      const id = parseInt(params.lugar_id);
      console.log('lugar_id:', id)
      const arrLugar = await this.lugaresService.getLugarbyId(params.lugar_id);
      this.lugar = arrLugar;
      console.log(this.lugar)
      this.edicionLugares = new FormGroup({
        id: new FormControl(this.lugar.id),
        nombre: new FormControl(this.lugar.nombre),
        direccion: new FormControl(this.lugar.direccion),
        poblacion: new FormControl(this.lugar.poblacion),
        codigo_postal: new FormControl(this.lugar.codigo_postal),
        provincia: new FormControl(this.lugar.provincia),
        pais: new FormControl(this.lugar.pais),
        latitud: new FormControl(this.lugar.latitud),
        longitud: new FormControl(this.lugar.longitud),
        categoria: new FormControl(this.lugar.categoria),
        descripcion: new FormControl(this.lugar.descripcion),
        horario: new FormControl(this.lugar.horario),
        telefono: new FormControl(this.lugar.telefono),
        email: new FormControl(this.lugar.email),
        sitio_web: new FormControl(this.lugar.sitio_web),
        imagenes: new FormControl(this.lugar.imagenes)


      });

    });

    console.log('datosFormulario', this.edicionLugares.value)

  }

  onSubmit() {
    // Creación del objeto donde incluimos todos los campos del formulario y además la imagen



    let fd = new FormData();

    if (this.files && this.files.length > 0) {
      fd.append('imagenes', this.files[0])
    }
    fd.append('id', this.edicionLugares.value.id);
    fd.append('nombre', this.edicionLugares.value.nombre);
    fd.append('direccion', this.edicionLugares.value.direccion);
    fd.append('poblacion', this.edicionLugares.value.poblacion);
    fd.append('codigo_postal', this.edicionLugares.value.codigo_postal);
    fd.append('provincia', this.edicionLugares.value.provincia);
    fd.append('pais', this.edicionLugares.value.pais);
    fd.append('latitud', this.edicionLugares.value.latitud);
    fd.append('longitud', this.edicionLugares.value.longitud);
    fd.append('categoria', this.edicionLugares.value.categoria);
    fd.append('descripcion', this.edicionLugares.value.descripcion);
    fd.append('horario', this.edicionLugares.value.horario);
    fd.append('telefono', this.edicionLugares.value.telefono);
    fd.append('email', this.edicionLugares.value.email);
    fd.append('sitio_web', this.edicionLugares.value.sitio_web);


    // Delegamos el envío del formulario en el servicio

    this.lugaresService.editLugarbyId(this.edicionLugares.value).then(result => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Datos actualizados',
        showConfirmButton: false,
        timer: 2000
      })
      this.router.navigate(['/lugares/', this.edicionLugares.value.id]);
    })
  }

  onChange($event) {
    this.files = $event.target.files;
  }


}
