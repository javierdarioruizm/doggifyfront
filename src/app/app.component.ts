import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  login: boolean;


  constructor() {


  }

  ngOnInit(): void {

    if (localStorage.getItem('tokendoggify')) {
      console.log('HAYTOKEN', localStorage.getItem('tokendoggify'));

      this.login = true;

    } else {

      this.login = false;

    }
    console.log('LOGUEADO?:', this.login)

  }

}
