import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageHelper } from '@Helpers/ImageHelper';
import { IPublicacion } from '@Interfaces/index';
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
    const post = changes as unknown as IPublicacion;
    if (post) {
      const getImage = ImageHelper.getImages();
      this.publicacion().imagen = getImage;
    }
  }
}
