import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FavoritoItemComponent } from '@Components/index';
import { IComentario } from '@Interfaces/index';
import { ComentarioService } from '@Services/index';

@Component({
  selector: 'app-favoritos',
  imports: [FavoritoItemComponent],
  templateUrl: './favoritos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FavoritosComponent implements OnInit {
  private readonly toast = inject(ToastrService);
  private readonly comentariosService = inject(ComentarioService);
  public comments: IComentario[] = [];
  ngOnInit(): void {
    this.getFavorites();
  }
  private getFavorites() {
    this.comentariosService.getFavorites().subscribe({
      next: (favorites) => {
        this.comments = favorites;
      },
      error: (error) => {
        console.log('Error: ', error);
      },
      complete: () => {
        if (this.comments.length > 0) {
          setTimeout(() => {
            this.toast.info('Cargando los favoritos');
          }, 1500);
        }
      },
    });
  }
}
