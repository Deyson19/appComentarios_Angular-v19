import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IComentario } from '../../core/interfaces';
import { ComentarioService } from '../../core/services';
import { ImageHelper } from '../../core/helpers/ImageHelper';

@Component({
  selector: 'app-comentario',
  imports: [CommonModule],
  templateUrl: './comentario.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComentarioComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly comentariosService = inject(ComentarioService);
  public comentario = signal<IComentario | null>(null);

  getAvatar = computed(() => {
    return ImageHelper.getAvatar();
  });
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.comentariosService.getComentario(id).subscribe({
        next: (comentario) => {
          setTimeout(() => {
            this.comentario.set(comentario);
          }, 1500);
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
    } else {
      this.onBack();
    }
  }
  onBack() {
    this.router.navigate(['/']);
  }
}
