import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IPublicacion } from '../../core/interfaces';
import { ToastrService } from 'ngx-toastr';
import { ComentarioService } from '../../core/services';
import { IComentarioViewModel } from '../../core/viewModels/IComentarioViewModel';

@Component({
  selector: 'app-modal-nuevo-comentario',
  imports: [FormsModule],
  templateUrl: './modal-nuevo-comentario.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalNuevoComentarioComponent {
  private readonly _comentarioService = inject(ComentarioService);
  private readonly toast = inject(ToastrService);

  publicacion = input.required<IPublicacion>();
  onFormSubmitted = output<boolean>();

  //*Propiedades para el formulario
  nombrePersona: string = '';
  texto: string = '';

  onClose() {
    this.onFormSubmitted.emit(false);
  }
  onSubmit() {
    if (this.nombrePersona.length < 10 || this.texto.length < 10) {
      this.toast.warning('Los campos no son correctos');
      this.nombrePersona = '';
      this.texto = '';
      return;
    }
    const comentario: IComentarioViewModel = {
      nombrePersona: this.nombrePersona,
      texto: this.texto,
      publicacionId: this.publicacion().id,
    };
    this.onSendForm(comentario);
    this.nombrePersona = '';
    this.texto = '';
  }

  private onSendForm(model: IComentarioViewModel) {
    if (!model) {
      this.toast.error('El modelo no es correcto');
      return;
    }

    const request = this._comentarioService.postComentario(model).subscribe({
      next: (response) => {
        if (response) {
          this.nombrePersona = '';
          this.texto = '';
          this.toast.success('Comentario agregado correctamente');
          this.onFormSubmitted.emit(true);
        }
      },
      error: (error) => {
        this.toast.error('Error al agregar el comentario', 'Error');
        console.error(error);
      },
    });
    setTimeout(() => {
      request.unsubscribe();
    }, 1500);
  }
}
