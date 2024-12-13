import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IPublicacion } from '@Interfaces/index';
import { IPublicacionViewModel } from '@ViewModels/index';

@Injectable({
  providedIn: 'root',
})
export class PublicacionService {
  constructor() {}
  private readonly http = inject(HttpClient);
  private baseUrl: string = environment.baseUrl;

  getPublicaciones(): Observable<IPublicacion[]> {
    return this.http.get<IPublicacion[]>(`${this.baseUrl}/api/publicaciones`);
  }
  getPublicacion(id: string): Observable<IPublicacion> {
    return this.http.get<IPublicacion>(
      `${this.baseUrl}/api/publicaciones/${id}`
    );
  }
  postPublicacion(model: IPublicacionViewModel): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/api/publicaciones`, model);
  }
}
