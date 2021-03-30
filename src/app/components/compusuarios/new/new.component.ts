import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { debounceTime } from 'rxjs/operators';

declare var Swal;

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  formNewUser: FormGroup;
  formCorrecto: boolean;

  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private elementRef: ElementRef
  ) {



    this.formNewUser = new FormGroup({

      nombre: new FormControl('', [
        Validators.required]),
      email: new FormControl('', [
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/)
      ]),
      password: new FormControl('', [
        Validators.required]),

      password_repeat: new FormControl(''),

      condiciones: new FormControl('', [
        Validators.required]),

    }, [this.passwordValidator
    ]);

  }

  ngOnInit(): void {
    const emailControl = this.formNewUser.get('email');
    emailControl.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      console.log(value);
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


  // Función para validar

  checkValidator(controlName, validatorName) {

    return this.formNewUser.get(controlName).hasError(validatorName) && this.formNewUser.get(controlName).touched;

  }

  // Validador para la password

  passwordValidator(form: FormGroup) {
    const passwordValue = form.get('password').value;
    const passwordRepeatValue = form.get('password_repeat').value;

    if (passwordValue === passwordRepeatValue) {
      return null;

    } else {
      return { passwordvalidator: true };
    }


  }



  // Método para crear el usuario

  async onSubmit() {
    console.log(this.formNewUser.valid)
    if (this.formNewUser.valid) {

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
    else {
      Swal.fire({
        icon: 'error',
        title: 'Usuario no creado',
        text: 'Verifica los datos',
      })
    }

  }







}



