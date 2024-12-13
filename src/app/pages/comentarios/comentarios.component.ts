import { IComentario } from './../../core/interfaces/IComentario';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ComentarioService } from '../../core/services';
import { ComentarioCardComponent } from '../../components/comentarioCard/comentarioCard.component';

@Component({
  selector: 'app-comentarios',
  imports: [ComentarioCardComponent],
  templateUrl: './comentarios.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComentariosComponent implements OnInit {
  private readonly _comentarioService = inject(ComentarioService);
  comentarios = signal<IComentario[]>([]);

  totalComentarios = computed<number>(() => {
    return this.comentarios().length;
  });
  ngOnInit(): void {
    const request = this._comentarioService.getComentarios().subscribe({
      next: (comentarios) => {
        this.comentarios.update(() => [...this.comentarios(), ...comentarios]);
      },
      error: (error) => {
        console.error(error);
      },
    });
    setTimeout(() => {
      request.unsubscribe();
    }, 500);
  }
}
