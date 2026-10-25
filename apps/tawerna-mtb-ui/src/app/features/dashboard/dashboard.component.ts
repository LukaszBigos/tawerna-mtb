import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { LocationService } from '../../core/services/location.service';
import { DashboardStateService, GEOLOCATION_OPTIONS, MOBILE_BREAKPOINT_PX } from '../../core/services/dashboard-state.service';
import { DifficultyLevel, Location, PlaceType } from '../../shared/models/location.model';
import { DashboardFiltersComponent } from './dashboard-filters.component';
import { DashboardLocationResult, LocationListComponent } from './location-list.component';
import { MapComponent } from './map.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  host: { class: 'block h-full w-full' },
  imports: [DashboardFiltersComponent, LocationListComponent, MapComponent, TranslatePipe],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private readonly mapComponent = viewChild(MapComponent);

  public readonly locationService = inject(LocationService);
  private readonly dashboardState = inject(DashboardStateService);

  public readonly mobileView = signal<'list' | 'map'>('list');
  public readonly searchTerm = signal('');
  public readonly debouncedSearchTerm = signal('');
  public readonly selectedTypes = signal<PlaceType[]>([]);
  public readonly selectedDifficulties = signal<DifficultyLevel[]>([]);
  public readonly userCoordinates = signal<{ latitude: number; longitude: number } | null>(null);
  public readonly radiusKm = signal<number | null>(null);
  public readonly isLocating = signal(false);
  public readonly locationError = signal<string | null>(null);

  constructor() {
    toObservable(this.searchTerm).pipe(debounceTime(300)).subscribe((value) => {
      this.debouncedSearchTerm.set(value);
    });
  }

  public readonly filteredLocations = computed<DashboardLocationResult[]>(() =>
    this.dashboardState.filterLocations(
      this.debouncedSearchTerm(),
      this.selectedTypes(),
      this.selectedDifficulties(),
      this.userCoordinates(),
      this.radiusKm(),
    ),
  );

  public readonly visibleLocations = computed(() =>
    this.filteredLocations().map(({ location }) => location),
  );

  public toggleType(type: PlaceType): void {
    this.selectedTypes.update((selected) =>
      selected.includes(type) ? selected.filter((item) => item !== type) : [...selected, type],
    );
  }

  public toggleDifficulty(difficulty: DifficultyLevel): void {
    this.selectedDifficulties.update((selected) =>
      selected.includes(difficulty)
        ? selected.filter((item) => item !== difficulty)
        : [...selected, difficulty],
    );
  }

  public clearFilters(): void {
    this.searchTerm.set('');
    this.debouncedSearchTerm.set('');
    this.selectedTypes.set([]);
    this.selectedDifficulties.set([]);
    this.radiusKm.set(null);
  }

  public locateMe(): void {
    if (!navigator.geolocation) {
      this.locationError.set('dashboard.geolocationUnavailable');
      return;
    }

    this.isLocating.set(true);
    this.locationError.set(null);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        this.userCoordinates.set({ latitude: coords.latitude, longitude: coords.longitude });
        this.isLocating.set(false);
      },
      () => {
        this.locationError.set('dashboard.geolocationDenied');
        this.isLocating.set(false);
      },
      GEOLOCATION_OPTIONS,
    );
  }

  public selectLocation(location: Location): void {
    this.locationService.selectLocation(location);
    this.mapComponent()?.focusLocation(location.id);
    if (window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX}px)`).matches) {
      this.mobileView.set('map');
    }
  }
}
