import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  TemplateRef,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PublicacionCardComponent } from '../../components/publicacion-card/publicacion-card.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PublicacionService } from '../../core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { IComentario, IPublicacion } from '../../core/interfaces';
import { ModalNuevoComentarioComponent } from '../../components/modal-nuevo-comentario/modal-nuevo-comentario.component';
import { ComentarioContainerComponent } from '../../components/comentario-container/comentario-container.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-publicacion',
  imports: [
    PublicacionCardComponent,
    SpinnerComponent,
    CommonModule,
    FormsModule,
    ModalNuevoComentarioComponent,
    ComentarioContainerComponent,
  ],
  templateUrl: './publicacion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicacionComponent implements OnInit {
  private readonly toast = inject(ToastrService);
  private readonly _publicacionService = inject(PublicacionService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  //*Usar Modal de Ngbootstrap
  private readonly modalService = inject(NgbModal);

  public publicacion = signal<IPublicacion | null>(null);
  private favoritos: IComentario[] = [];

  //*Propiedades para el formulario
  nombrePersona: string = '';
  texto: string = '';
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getPublicacion(id);
    } else {
      this.router.navigate(['/']);
    }
  }
  openModal(content: TemplateRef<ElementRef>) {
    this.modalService.open(content);
  }
  wasSended(close: boolean) {
    if (!close) {
      this.toast.info('Modal cerrado, no hay cambios...');
    }
    this.modalService.dismissAll();
  }

  private getPublicacion(id: string): void {
    const publicacion = this._publicacionService.getPublicacion(id).subscribe({
      next: (response) => {
        if (response) {
          this.publicacion.set(response);
        }
      },
      error: (error) => {
        this.toast.error('Error al cargar la publicación', 'Error');
        console.error(error);
      },
    });
    setTimeout(() => {
      publicacion.unsubscribe();
    }, 2000);
  }
}
