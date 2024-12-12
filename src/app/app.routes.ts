import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'publicaciones',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/publicaciones/publicaciones.component').then(
            (m) => m.PublicacionesComponent
          ),
      },
      {
        path: ':id',
        title: 'Publicación',
        async loadComponent() {
          return await import('./pages/publicacion/publicacion.component').then(
            (m) => m.PublicacionComponent
          );
        },
      },
    ],
  },
  {
    path: 'comentarios',
    children: [
      {
        path: '',
        async loadComponent() {
          const c = await import(
            './pages/comentarios/comentarios.component'
          ).then((m) => m.ComentariosComponent);
          return c;
        },
      },
      {
        path: ':id',
        async loadComponent() {
          return await import('./pages/comentario/comentario.component').then(
            (_) => _.ComentarioComponent
          );
        },
      },
    ],
  },
  {
    path: 'favoritos',
    loadComponent: () =>
      import('./pages/favoritos/favoritos.component').then((m) => m.default),
  },
  {
    path: '**',
    redirectTo: '/publicaciones',
    pathMatch: 'full',
  },
];
