export interface Lugar {
    id: number;
    nombre: string;
    direccion: string;
    codigo_postal: number;
    poblacion: string;
    provincia: string;
    pais: number;
    latitud: number;
    longitud: number;
    telefono: number;
    email: string;
    horario: string;
    categoria: string;
    sitio_web: string;
    imagen: string;
    imagenes: string;
    arrimagenes: any;
    descripcion: string;
    puntuacion: number;
    valoracion_media: number;
    numero_valoraciones: number;
    favorito: boolean;

}