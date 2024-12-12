import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IMenuItems } from '../../core/interfaces/IMenuItems';

@Component({
  selector: 'app-shared-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  public menuItems: IMenuItems[] = [
    {
      name: 'Publicaciones',
      icon: 'bi bi-card-text',
      path: '/publicaciones',
    },
    {
      name: 'Comentarios',
      icon: 'bi bi-chat-left-text',
      path: '/comentarios',
    },
    {
      name: 'Favoritos',
      icon: 'bi bi-star',
      path: '/favoritos',
    },
  ];
}
