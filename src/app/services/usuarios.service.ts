import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usarios.interface';
import { Valoracion } from '../interfaces/valoraciones.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuario: Usuario;
  baseUrl: string;
  valoraciones: Valoracion;


  constructor(private httpClient: HttpClient) {

    this.baseUrl = 'http://localhost:3000/api';

  }


  // Método para obtener todos los usuarios

  getAll(): Promise<Usuario[]> {

    return this.httpClient.get<Usuario[]>(`${this.baseUrl}/usuarios`).toPromise();

  }

  // Método para obtener los datos de cada usuario por Id

  getUsuariobyId(): Promise<Usuario> {

    return this.httpClient.get<Usuario>(`${this.baseUrl}/usuarios/cuenta`, this.createHeaders()).toPromise();

  }

  // Método para crear un usuario nuevo

  insert(formValues): Promise<Usuario> {

    return this.httpClient.post<Usuario>(`${this.baseUrl}/usuarios/registro`, formValues).toPromise();

  }

  // Método para que un usuario haga login

  login(formValues): Promise<any> {

    return this.httpClient.post(`${this.baseUrl}/usuarios/login`, formValues).toPromise();

  }



  // Método para acceder a la cuenta de cada usuario


  cuentaUsuariobyId(pId): Promise<Usuario> {

    return this.httpClient.post<Usuario>(`${this.baseUrl}/usuarios/cuenta`, pId).toPromise();

  }



  // Método para editar los datos de un usuario

  editUsuariobyId(pId): Promise<Usuario> {

    return this.httpClient.put<Usuario>(`${this.baseUrl}/usuarios/${pId}`, pId).toPromise();

  }


  // Método para borrar los datos de un usuario

  deleteUsuariobyId(): Promise<Usuario> {

    return this.httpClient.delete<Usuario>(`${this.baseUrl}/usuarios/borrado`, this.createHeaders()).toPromise();

  }






  createHeaders() {
    return {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('tokendoggify')
      })
    }

  }

}
