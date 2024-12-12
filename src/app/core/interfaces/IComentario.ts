import { IPublicacion } from './IPublicacion';

export interface IComentario {
  id: string;
  nombrePersona: string;
  texto: string;
  fechaPublicacion: string;
  publicacionId: string;
  publicacion: IPublicacion | null;
}
