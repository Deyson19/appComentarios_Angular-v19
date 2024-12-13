import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ComentarioService } from '../../core/services';
import { ImageHelper } from '../../core/helpers/ImageHelper';
import { CommonModule } from '@angular/common';
import { IComentario } from '@Interfaces/index';

@Component({
  selector: 'app-favorito-item',
  imports: [CommonModule],
  templateUrl: './favoritoItem.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritoItemComponent implements OnChanges {
  private readonly toast = inject(ToastrService);
  private readonly comentariosService = inject(ComentarioService);

  comentario = input.required<IComentario>();

  ngOnChanges(changes: SimpleChanges): void {
    console.log(
      'Cambios en el componente: ',
      changes['comentario'].currentValue
    );
  }
  deleteComment(id: string) {
    this.comentariosService.removeFavorite(id);
    setTimeout(() => {
      this.toast.warning('Comentario eliminado de favoritos');
    }, 1800);
  }

  getAvatar() {
    return ImageHelper.getAvatar();
  }
}
