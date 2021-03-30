import { Component, ElementRef, OnInit } from '@angular/core';
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
  login: boolean;

  constructor(
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef
  ) {

    this.login = true;
  }


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

  ngAfterViewInit() {
    // this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fff';

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
        localStorage.removeItem('tokendoggify');
        setTimeout(() => this.router.navigate(['/']), 2500);

        setTimeout(() => window.location.reload(), 2700);
      }
    })

    // setTimeout(() => this.router.navigate(['/']), 2500);
  }




}

