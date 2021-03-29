import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LugaresService } from 'src/app/services/lugares.service';

@Component({
  selector: 'app-newlugar',
  templateUrl: './newlugar.component.html',
  styleUrls: ['./newlugar.component.css']
})
export class NewlugarComponent implements OnInit {

  formularioLugares: FormGroup;
  files;

  constructor(
    private lugaresService: LugaresService,
    private router: Router
  ) {

    this.formularioLugares = new FormGroup({

      nombre: new FormControl(),
      direccion: new FormControl(),
      poblacion: new FormControl(),
      codigo_postal: new FormControl(),
      provincia: new FormControl(),
      pais: new FormControl(),
      latitud: new FormControl(),
      longitud: new FormControl(),
      categoria: new FormControl(),
      descripcion: new FormControl(),
      horario: new FormControl(),
      telefono: new FormControl(),
      email: new FormControl(),
      sitio_web: new FormControl()


    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    // Creación del objeto donde incluimos todos los campos del formulario y además la imagen
    let fd = new FormData();
    if (this.files && this.files.length > 0) {
      fd.append('imagenes', this.files[0])
    }


    fd.append('nombre', this.formularioLugares.value.nombre);
    fd.append('direccion', this.formularioLugares.value.direccion);
    fd.append('poblacion', this.formularioLugares.value.poblacion);
    fd.append('codigo_postal', this.formularioLugares.value.codigo_postal);
    fd.append('provincia', this.formularioLugares.value.provincia);
    fd.append('pais', this.formularioLugares.value.pais);
    fd.append('latitud', this.formularioLugares.value.latitud);
    fd.append('longitud', this.formularioLugares.value.longitud);
    fd.append('categoria', this.formularioLugares.value.categoria);
    fd.append('descripcion', this.formularioLugares.value.descripcion);
    fd.append('horario', this.formularioLugares.value.horario);
    fd.append('telefono', this.formularioLugares.value.telefono);
    fd.append('email', this.formularioLugares.value.email);
    fd.append('sitio_web', this.formularioLugares.value.sitio_web);


    // Delegamos el envío del formulario en el servicio
    this.lugaresService.create(fd).then(result => {
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Lugar creado correctamente',
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => this.router.navigate(['/lugares']), 2500);
      // this.router.navigate(['']);
    })
  }

  onChange($event) {
    this.files = $event.target.files;
  }
