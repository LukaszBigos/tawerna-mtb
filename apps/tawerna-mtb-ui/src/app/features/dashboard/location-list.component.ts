import { DecimalPipe } from '@angular/common';
import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { DifficultyLevel, Location } from '../../shared/models/location.model';

export interface DashboardLocationResult {
  location: Location;
  distanceKm: number | null;
  difficulties: DifficultyLevel[];
}

@Component({
  selector: 'app-location-list',
  standalone: true,
  host: { class: 'flex min-h-0 min-w-0 flex-1 flex-col' },
  imports: [DecimalPipe, NgClass, TranslatePipe],
  templateUrl: './location-list.component.html',
})
export class LocationListComponent {
  public readonly places = input.required<DashboardLocationResult[]>();
  public readonly isLoading = input(false);
  public readonly selectedLocationId = input<number | null>(null);
  public readonly locationSelected = output<Location>();
}
