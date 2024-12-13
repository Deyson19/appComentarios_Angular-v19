import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PublicacionService } from '../../core/services';
import { IPublicacion } from '../../core/interfaces';
import { ToastrService } from 'ngx-toastr';
import { PublicacionCardComponent } from '../../components/publicacion-card/publicacion-card.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  imports: [PublicacionCardComponent, SpinnerComponent],
  templateUrl: './publicaciones.component.html',
  styleUrl: './publicaciones.component.css',
})
export class PublicacionesComponent implements OnInit, OnDestroy {
  private readonly _publicacionService = inject(PublicacionService);
  public publicaciones: IPublicacion[] = [];
  private readonly toast = inject(ToastrService);
  ngOnInit(): void {
    this.getPublicaciones();
  }
  ngOnDestroy(): void {
    if (this.publicaciones.length > 0) {
      localStorage.setItem('publicaciones', JSON.stringify(this.publicaciones));
    }
  }

  private getPublicaciones(): void {
    let publicacionesLocales = localStorage.getItem('publicaciones');

    if (publicacionesLocales) {
      this.publicaciones = JSON.parse(publicacionesLocales);

      this.toast.success('Registros Locales');
    } else {
      this.toast.info('Cargar registros del backend');
      this._publicacionService.getPublicaciones().subscribe({
        next: (publicaciones) => {
          setTimeout(() => {
            this.publicaciones = publicaciones;
          }, 1500);
        },
        error: (error) => {
          this.toast.error('Error al cargar registros', 'Error');
          console.error(error);
        },
      });
    }
  }
}
