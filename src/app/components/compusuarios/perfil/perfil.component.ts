import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuarios.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';

declare var Swal;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  formEditUser: FormGroup;
  usuario: Usuario;

  constructor(
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit() {

    this.activatedRoute.params.subscribe(async params => {
      const id = parseInt(params.idUsuario);
      const arrUsuario = await this.usuariosService.getUsuariobyId();
      this.usuario = arrUsuario;
      console.log(this.usuario)
      this.formEditUser = new FormGroup({

        nombre: new FormControl(this.usuario.nombre),
        apellidos: new FormControl(this.usuario.apellidos),
        direccion: new FormControl(this.usuario.direccion),
        poblacion: new FormControl(this.usuario.poblacion),
        codigo_postal: new FormControl(this.usuario.codigo_postal),
        provincia: new FormControl(this.usuario.provincia),
        pais: new FormControl(this.usuario.pais),
        email: new FormControl(this.usuario.email),
        password: new FormControl(this.usuario.password),
        telefono: new FormControl(this.usuario.telefono),
        foto: new FormControl(this.usuario.foto)


      });

    });

  }

  async onSubmit() {
    console.log(this.formEditUser.value);
    const response = await this.usuariosService.editUsuariobyId(this.formEditUser.value);
    console.log(response);

    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Datos guardados correctamente',
      showConfirmButton: false,
      timer: 2000
    })
    setTimeout(() => this.router.navigate(['/user']), 2500);
  }


  Borrar() {
    console.log(this.formEditUser.value);
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, borrála!'
    }).then((result) => {
      if (result.isConfirmed) {
        const response = this.usuariosService.deleteUsuariobyId()
          .then((result) => {
            console.log(response);
          })
        Swal.fire(
          'Eliminada',
          'Tu cuenta ha sido borrada.',
          'success'
        )
      }
    })

    setTimeout(() => this.router.navigate(['/']), 2500);
  }




}

