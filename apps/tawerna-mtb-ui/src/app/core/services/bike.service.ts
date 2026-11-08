import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { GarageBike } from '../../shared/models/garage-bike.model';

@Injectable({ providedIn: 'root' })
export class BikeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/v1/bikes';

  public readonly bikes = signal<GarageBike[]>([]);
  public readonly isLoading = signal(false);
  public readonly error = signal<string | null>(null);

  public loadBikes(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.http
      .get<GarageBike[]>(this.apiUrl)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        catchError(() => {
          this.error.set('errors.loadBikes');
          return of([]);
        }),
      )
      .subscribe({
        next: (bikes) => this.bikes.set(bikes),
      });
  }
}
