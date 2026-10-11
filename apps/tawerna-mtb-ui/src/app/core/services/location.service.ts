import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs';
import { Location } from '../../shared/models/location.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private readonly http = inject(HttpClient);

  public readonly locations = signal<Location[]>([]);
  public readonly selectedLocation = signal<Location | null>(null);
  public readonly isLoading = signal(true);
  public readonly error = signal<string | null>(null);

  public loadLocations(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.http
      .get<Location[]>('http://localhost:8080/api/v1/locations')
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (locations) => this.locations.set(locations),
        error: () => this.error.set('Nie udało się załadować miejscówek.'),
      });
  }

  public selectLocation(location: Location): void {
    this.selectedLocation.set(location);
  }
}
