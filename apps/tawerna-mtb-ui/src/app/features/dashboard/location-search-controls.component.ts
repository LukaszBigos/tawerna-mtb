import { Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-location-search-controls',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './location-search-controls.component.html',
})
export class LocationSearchControlsComponent {
  public readonly searchTerm = input('');
  public readonly coordinatesAvailable = input(false);
  public readonly radiusKm = input<number | null>(null);
  public readonly isLocating = input(false);
  public readonly locationError = input<string | null>(null);

  public readonly searchChanged = output<string>();
  public readonly locateRequested = output<void>();
  public readonly radiusChanged = output<number | null>();

  public onRadiusChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.radiusChanged.emit(value ? Number(value) : null);
  }
}
