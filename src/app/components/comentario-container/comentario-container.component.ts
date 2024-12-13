import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IComentario } from '../../core/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comentario-container',
  imports: [CommonModule],
  templateUrl: './comentario-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComentarioContainerComponent {
  comentario = input.required<IComentario>();
  addToFavorite(id: string) {
    console.log('Agregando a favoritos');
  }
  deleteComment(id: string) {
    console.log('Eliminando comentario');
  }
}
