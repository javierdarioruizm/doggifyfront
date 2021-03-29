import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lugar } from '../interfaces/lugares.interface';


@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  lugares: Lugar;
  baseUrl: string;
  categoria: string;
  listaCategorias: any;

  constructor(private httpClient: HttpClient) {

    this.baseUrl = 'http://localhost:3000/api';
    this.listaCategorias = [];
  }

  // Método para obtener los favoritos por usuario

  getFavoritosByUser(): Promise<Lugar[]> {


    return this.httpClient.get<Lugar[]>(`${this.baseUrl}/favoritos/`, this.createHeaders()).toPromise();

  }

  // Método para obtener todos los favoritos por página

  getFavoritosByPage(pNumPagina): Promise<Lugar[]> {


    return this.httpClient.get<Lugar[]>(`${this.baseUrl}/favoritos/pagina/${pNumPagina}`, this.createHeaders()).toPromise();

  }

  // Método para obtener el número de páginas para mostrar todos los lugares

  getNumPagesFavoritos(): Promise<any> {

    return this.httpClient.get<any>(`${this.baseUrl}/favoritos/paginas`, this.createHeaders()).toPromise();

  }

  // Método para obtener el número de páginas para mostrar cada categoría

  getNumPagesFavoritosByCategoria(pCategoria): Promise<any> {

    return this.httpClient.get<any>(`${this.baseUrl}/favoritos/${pCategoria}/paginas`, this.createHeaders()).toPromise();

  }


  // Método para filtrar por categorias por páginas

  getFavoritosByCategoriaByPage(pCategoria, pNumPagina): Promise<Lugar[]> {

    return this.httpClient.get<Lugar[]>(`${this.baseUrl}/favoritos/categoria/${pCategoria}/pagina/${pNumPagina}`, this.createHeaders()).toPromise();

  }

  // Método para obtener todos las categorias

  getFavoritosCategorias(): Promise<Lugar[]> {

    return this.httpClient.get<Lugar[]>(`${this.baseUrl}/favoritos/all/categorias`, this.createHeaders()).toPromise();

  }

  // Método para obtener los datos de cada lugar por Id

  getLugarbyId(pId): Promise<Lugar> {

    return this.httpClient.get<Lugar>(`${this.baseUrl}/lugares/${pId}`).toPromise();

  }


  addFavoritosById(pId): Promise<any> {

    return this.httpClient.post<any>(`${this.baseUrl}/favoritos/${pId}`, {}, this.createHeaders()).toPromise();

  }



  deleteFavoritosById(pId): Promise<any> {

    return this.httpClient.delete<any>(`${this.baseUrl}/favoritos/${pId}`, this.createHeaders()).toPromise();

  }


  createHeaders() {
    return {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('tokendoggify')
      })
    }

  }


}
