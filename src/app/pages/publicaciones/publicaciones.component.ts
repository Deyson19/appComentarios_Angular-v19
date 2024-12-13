import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PublicacionCardComponent, SpinnerComponent } from '@Components/index';
import { IPublicacion } from '@Interfaces/index';
import { PublicacionService } from '@Services/index';

@Component({
  imports: [PublicacionCardComponent, SpinnerComponent],
  templateUrl: './publicaciones.component.html',
  styleUrl: './publicaciones.component.css',
})
export class PublicacionesComponent implements OnInit, OnDestroy {
  private readonly _publicacionService = inject(PublicacionService);
  private readonly toast = inject(ToastrService);
  public publicaciones: IPublicacion[] = [];
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
