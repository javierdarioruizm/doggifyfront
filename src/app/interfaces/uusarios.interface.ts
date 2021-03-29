export interface Usuario {
    id: number;
    nombre: string;
    apellidos: string;
    direccion: string;
    codigo_postal: number;
    poblacion: string;
    provincia: string;
    pais: number;
    telefono?: number;
    email: string;
    foto?: string;
    password: string;
}