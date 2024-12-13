import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ComentarioService } from '@Services/index';
import { IComentario, IPublicacion } from '@Interfaces/index';

@Component({
  selector: 'app-comentario-container',
  imports: [CommonModule],
  templateUrl: './comentario-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComentarioContainerComponent {
  private readonly toast = inject(ToastrService);

  private readonly _comentarioService = inject(ComentarioService);
  public publicacion = input.required<IPublicacion>();
  private favoritos: IComentario[] = [];

  comentario = input.required<IComentario>();
  addToFavorite(id: string) {
    const comentario = this.publicacion()?.comentarios?.find(
      (x) => x.id === id
    );
    if (comentario) {
      this.toast.success('Comentario agregado a favoritos');
      this._comentarioService.addToFavorite(comentario);
    } else {
      this.toast.error('Error al agregar comentario a favoritos');
    }
  }
  deleteComentario(id: string) {
    if (id) {
      this._comentarioService.removeFavorite(id);
      this.toast.warning('Comentario eliminado de favoritos');
    }
  }
}
