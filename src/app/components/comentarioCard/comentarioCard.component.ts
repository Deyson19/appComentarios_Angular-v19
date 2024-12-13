import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComentarioService } from '@Services/index';
import { IComentario } from '@Interfaces/index';

@Component({
  selector: 'app-comentario-card',
  imports: [RouterLink, CommonModule],
  templateUrl: './comentarioCard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComentarioCardComponent implements OnChanges {
  private readonly _comentariosService = inject(ComentarioService);
  comentario = input.required<IComentario>();
  constructor(private changeDf: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    let _comentario = changes['comentario'].currentValue;
    if (_comentario) {
      this._comentariosService.getComentario(this.comentario().id).subscribe({
        next: (comentario) => {
          this.comentario()!.publicacion = comentario.publicacion;
          this.changeDf.markForCheck();
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
