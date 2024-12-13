import { computed, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { IComentario } from '@Interfaces/index';
import { IComentarioViewModel } from '@ViewModels/index';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  private readonly baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {
    this.myFavorites;
  }

  private favoritos = new BehaviorSubject<IComentario[]>([]);
  private _favoritos: IComentario[] = [];

  private myFavorites = computed(() => {
    let total: IComentario[] = [];
    this.favoritos.subscribe((x) => {
      console.log(x);
      total = x;
    });
    return total;
  });
  private OnLoadFavorites(): void {
    console.log('OnInit');

    const items = localStorage.getItem('favoritos');
    if (items) {
      this.favoritos.next(JSON.parse(items));
    } else {
      this.favoritos.next([]);
    }
  }
  private OnSaveFavorites(): void {
    if (this._favoritos.length > 0) {
      localStorage.setItem('favoritos', JSON.stringify(this._favoritos));
    }
    console.log('Destruido, elementos guardados.');
  }
  addToFavorite(comentario: IComentario) {
    const lastValues = this.favoritos.getValue();
    this.favoritos.next([...lastValues, comentario]);
    const existFavorite = this._favoritos.find((x) => x.id === comentario.id);
    if (!existFavorite) {
      this._favoritos.push(comentario);
    }
    this.OnSaveFavorites();
  }
  removeFavorite(id: string) {
    const findFavorites = this.favoritos.getValue();
    this.favoritos.next(findFavorites.filter((x) => x.id !== id));
  }
  getFavorites(): Observable<IComentario[]> {
    this.OnLoadFavorites();
    if (this._favoritos.length > 0) {
      this.favoritos.next(this._favoritos);
    }
    return this.favoritos.asObservable();
  }

  getComentarios(): Observable<IComentario[]> {
    return this.httpClient.get<IComentario[]>(
      `${this.baseUrl}/api/comentarios`
    );
  }
  getComentario(id: string): Observable<IComentario> {
    return this.httpClient.get<IComentario>(
      `${this.baseUrl}/api/comentarios/${id}`
    );
  }
  postComentario(model: IComentarioViewModel): Observable<string> {
    return this.httpClient.post<string>(
      `${this.baseUrl}/api/comentarios`,
      model
    );
  }
}
