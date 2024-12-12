import { IComentario } from './IComentario';

export interface IPublicacion {
  id: string;
  fechaPublicacion: string;
  autor: string;
  contenido: string;
  categoria: string;
  imagen?: string;
  comentarios: IComentario[] | null;
}
