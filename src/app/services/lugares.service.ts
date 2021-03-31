import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Valoracion } from '../interfaces/valoraciones.interface';
import { Lugar } from '../interfaces/lugares.interface';

@Injectable({
  providedIn: 'root'
})
export class LugaresService {

  lugares: Lugar;
  baseUrl: string;
  valoraciones: Valoracion;
  categoria: string;
  listaCategorias: any;


  constructor(private httpClient: HttpClient) {

    // this.baseUrl = 'http://localhost:3000/api';
    this.baseUrl = 'https://doggifyback.herokuapp.com/api';
    this.listaCategorias = [];
  }


  // Método para obtener todos los lugares

  getAll(): Promise<Lugar[]> {

    return this.httpClient.get<Lugar[]>(`${this.baseUrl}/lugares`).toPromise();

  }

  // Método para obtener todos los lugares por página

  getAllByPage(pNumPagina): Promise<Lugar[]> {

    return this.httpClient.get<Lugar[]>(`${this.baseUrl}/lugares/pagina/${pNumPagina}`).toPromise();

  }

  // Método para obtener el número de páginas para mostrar todos los lugares

  getPages(): Promise<any> {

    return this.httpClient.get<any>(`${this.baseUrl}/lugares/paginas`).toPromise();

  }

  // Método para obtener el número de páginas para mostrar cada categoría

  getNumPagesCategoria(pCategoria): Promise<any> {

    return this.httpClient.get<any>(`${this.baseUrl}/lugares/${pCategoria}/paginas`).toPromise();

  }


  // Método para filtrar por categorias por páginas

  getByCategoriaByPage(pCategoria, pNumPagina): Promise<Lugar[]> {

    return this.httpClient.get<Lugar[]>(`${this.baseUrl}/lugares/categoria/${pCategoria}/pagina/${pNumPagina}`).toPromise();

  }

  // Método para filtrar por categorias

  getByCategoria(pCategoria): Promise<Lugar[]> {

    return this.httpClient.get<Lugar[]>(`${this.baseUrl}/lugares/categoria/${pCategoria}`).toPromise();

  }


  // Método para obtener todos las categorias

  getAllCategorias(): Promise<Lugar[]> {

    return this.httpClient.get<Lugar[]>(`${this.baseUrl}/lugares/all/categorias`).toPromise();

  }

  // Método para obtener los datos de cada lugar por Id

  getLugarbyId(pId): Promise<Lugar> {

    return this.httpClient.get<Lugar>(`${this.baseUrl}/lugares/${pId}`).toPromise();

  }

  // Método para crear un lugar nuevo

  // insert(formValues): Promise<Lugar> {

  //   return this.httpClient.post<Lugar>(`${this.baseUrl}/lugares/`, formValues).toPromise();

  // }

  create(fd: FormData) {
    return this.httpClient.post(`${this.baseUrl}/lugares/`, fd).toPromise();
  }


  // Método para editar los datos de un lugar

  editLugarbyId(fd: FormData): Promise<Lugar> {

    return this.httpClient.put<Lugar>(`${this.baseUrl}/lugares/edit`, fd, this.createHeaders()).toPromise();

  }

  // Método para obtener el número de páginas de las valoraciones de cada lugar

  getNumPagesLugar(pIdLugar): Promise<any> {

    return this.httpClient.get<any>(`${this.baseUrl}/valoraciones/${pIdLugar}/paginas`).toPromise();

  }


  guardarFavorito(pLugarId) {


    const body = {
      item_id: pLugarId
    }
    return this.httpClient.post(`${this.baseUrl}/favoritos/new`, body).toPromise();
  }


  // Método para obtener la valoración media de cada lugar por Id

  getValoracionbyId(pId): Promise<Lugar> {

    return this.httpClient.get<Lugar>(`${this.baseUrl}/valoracion/${pId}`).toPromise();

  }

  // Método para obtener las valoraciones de cada lugar por Id

  getValoracionesById(pIdLugar): Promise<Valoracion[]> {

    return this.httpClient.get<Valoracion[]>(`${this.baseUrl}/valoraciones/${pIdLugar}`).toPromise();

  }


  // Método para mostrar las valoraciones de cada lugar por páginas

  getValoracionesByIdByPage(pIdLugar, pNumPagina): Promise<Valoracion[]> {

    return this.httpClient.get<Valoracion[]>(`${this.baseUrl}/valoraciones/${pIdLugar}/pagina/${pNumPagina}`).toPromise();

  }




  insertComentario(pIdLugar, formValues) {

    return this.httpClient.post(`${this.baseUrl}/valoraciones/${pIdLugar}`, formValues, this.createHeaders()).toPromise();

  }


  createHeaders() {
    return {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('tokendoggify')
      })
    }

  }




}
