import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IPublicacion } from '@Interfaces/index';
import { PublicacionService } from '@Services/index';

import {
  ComentarioContainerComponent,
  ModalNuevoComentarioComponent,
  PublicacionCardComponent,
  SpinnerComponent,
} from '@Components/index';
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

  //*Usar Modal de Ngb Bootstrap
  private readonly modalService = inject(NgbModal);

  public publicacion = signal<IPublicacion | null>(null);

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
  openModal(content: TemplateRef<ElementRef>): void {
    this.modalService.open(content);
  }
  wasSended(close: boolean): void {
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
