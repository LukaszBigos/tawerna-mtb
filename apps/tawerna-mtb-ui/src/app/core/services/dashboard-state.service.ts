import { inject, Injectable } from '@angular/core';
import { LocationService } from './location.service';
import { DifficultyLevel, Location, PlaceType } from '../../shared/models/location.model';
import { DashboardLocationResult } from '../../features/dashboard/location-list.component';
import { distanceBetween } from '../../shared/utils/geometry.util';

export const MOBILE_BREAKPOINT_PX = 767;

export const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: false,
  maximumAge: 300_000,
  timeout: 10_000,
};

@Injectable({
  providedIn: 'root',
})
export class DashboardStateService {
  private readonly locationService = inject(LocationService);

  filterLocations(
    searchTerm: string,
    selectedTypes: PlaceType[],
    selectedDifficulties: DifficultyLevel[],
    userCoordinates: { latitude: number; longitude: number } | null,
    radiusKm: number | null,
  ): DashboardLocationResult[] {
    const query = searchTerm.trim().toLocaleLowerCase();
    const types = selectedTypes;
    const difficulties = selectedDifficulties;
    const coordinates = userCoordinates;
    const radius = radiusKm;

    const hasTypeFilter = types.length > 0;
    const hasDifficultyFilter = difficulties.length > 0;
    const needsDistance = coordinates !== null;

    const results: DashboardLocationResult[] = [];

    for (const location of this.locationService.locations()) {
      if (query && !location.name.toLocaleLowerCase().includes(query)) {
        continue;
      }

      if (hasTypeFilter && !types.includes(location.type)) {
        continue;
      }

      if (hasDifficultyFilter) {
        let matchesDifficulty = false;
        for (const trail of location.trails) {
          if (difficulties.includes(trail.difficulty)) {
            matchesDifficulty = true;
            break;
          }
        }
        if (!matchesDifficulty) {
          continue;
        }
      }

      let distanceKm: number | null = null;
      if (needsDistance) {
        distanceKm = distanceBetween(location, coordinates);
        if (radius !== null && distanceKm > radius) {
          continue;
        }
      }

      const locationDifficulties: DifficultyLevel[] = [];
      const seen = new Set<DifficultyLevel>();
      for (const trail of location.trails) {
        const d = trail.difficulty;
        if (
          (!hasDifficultyFilter || difficulties.includes(d)) &&
          !seen.has(d)
        ) {
          seen.add(d);
          locationDifficulties.push(d);
        }
      }

      results.push({ location, distanceKm, difficulties: locationDifficulties });
    }

    results.sort((first, second) => {
      if (first.distanceKm === null || second.distanceKm === null) {
        return first.location.name?.localeCompare(second.location.name ?? '') ?? 0;
      }
      return first.distanceKm - second.distanceKm;
    });

    return results;
  }
}