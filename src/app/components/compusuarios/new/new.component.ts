import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

declare var Swal;

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  formNewUser: FormGroup;

  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private elementRef: ElementRef
  ) {

    this.formNewUser = new FormGroup({

      nombre: new FormControl(),
      // apellidos: new FormControl(),
      // direccion: new FormControl(),
      // poblacion: new FormControl(),
      // codigo_postal: new FormControl(),
      // provincia: new FormControl(),
      // pais: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
      // telefono: new FormControl(),
      // foto: new FormControl(),


    });
  }

  ngOnInit(): void {

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
    console.log(this.formNewUser.value);
    const response = await this.usuariosService.insert(this.formNewUser.value);
    console.log(response);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Usuario creado correctamente',
      showConfirmButton: false,
      timer: 2000
    })
    setTimeout(() => this.router.navigate(['/user']), 2500);
  }

}



