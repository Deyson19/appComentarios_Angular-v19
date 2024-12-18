import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-components-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  message = 'Cargando...';
}
