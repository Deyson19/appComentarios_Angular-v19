import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IPublicacion } from '../../core/interfaces';
import { ImageHelper } from '../../core/helpers/ImageHelper';

@Component({
  selector: 'app-publicacion-card',
  imports: [RouterLink, CommonModule],
  templateUrl: './publicacion-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicacionCardComponent implements OnChanges {
  public publicacion = input.required<IPublicacion>();
  public isDetails = input<boolean>(false);
  ngOnChanges(changes: SimpleChanges): void {
    let post = changes as unknown as IPublicacion;
    if (post) {
      const getImage = ImageHelper.getImages();
      this.publicacion().imagen = getImage;
    }
  }
}
