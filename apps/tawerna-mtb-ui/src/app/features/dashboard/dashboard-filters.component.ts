import { NgClass } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { DifficultyLevel, PlaceType } from '../../shared/models/location.model';
import { FiltersToggleButtonComponent } from './filters-toggle-button.component';
import { LocationSearchControlsComponent } from './location-search-controls.component';
import { PlaceTypeFilterComponent } from './place-type-filter.component';
import { TrailDifficultyFilterComponent } from './trail-difficulty-filter.component';

@Component({
  selector: 'app-dashboard-filters',
  standalone: true,
  imports: [
    FiltersToggleButtonComponent,
    LocationSearchControlsComponent,
    NgClass,
    PlaceTypeFilterComponent,
    TrailDifficultyFilterComponent,
    TranslatePipe,
  ],
  templateUrl: './dashboard-filters.component.html',
})
export class DashboardFiltersComponent {
  public readonly searchTerm = input('');
  public readonly selectedTypes = input<PlaceType[]>([]);
  public readonly selectedDifficulties = input<DifficultyLevel[]>([]);
  public readonly coordinatesAvailable = input(false);
  public readonly radiusKm = input<number | null>(null);
  public readonly isLocating = input(false);
  public readonly locationError = input<string | null>(null);
  public readonly mobileView = input<'list' | 'map'>('list');
  public readonly filtersOpen = signal(false);

  public readonly searchChanged = output<string>();
  public readonly typeToggled = output<PlaceType>();
  public readonly difficultyToggled = output<DifficultyLevel>();
  public readonly locateRequested = output<void>();
  public readonly radiusChanged = output<number | null>();
  public readonly clearRequested = output<void>();
  public readonly mobileViewChanged = output<'list' | 'map'>();
}
