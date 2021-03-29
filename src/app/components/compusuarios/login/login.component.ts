import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

declare var Swal;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  errorMessage: string;
  login: boolean;

  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private elementRef: ElementRef
  ) {

    this.formLogin = new FormGroup({

      email: new FormControl(),
      password: new FormControl()

    });

    this.login = false;
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


  onSubmit() {
    this.errorMessage = null;
    this.usuariosService.login(this.formLogin.value)
      .then(response => {
        console.log(response)
        if (response.error) {
          console.log('error_login', response.error)
          setTimeout(() => this.errorMessage = response.error, 300);
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Tu email y/o contraseña son incorrectos',
            showConfirmButton: true,

          })
        } else {
          console.log(response.token)
          localStorage.setItem('tokendoggify', response.token);

          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Acceso correcto',
            showConfirmButton: false,
            timer: 2000
          })
            .then(result => {

              this.login = true;
              this.router.navigate(['/user']);
              setTimeout(() => window.location.reload(), 100);

            });
          this.errorMessage = null;
        }

      })
      .catch(error => {
        console.log(error);
      });

  }



}
