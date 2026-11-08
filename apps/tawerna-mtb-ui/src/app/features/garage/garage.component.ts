import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { BikeService } from '../../core/services/bike.service';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.css',
})
export class GarageComponent {
  private readonly bikeService = inject(BikeService);

  protected readonly bikes = this.bikeService.bikes;
  protected readonly isLoading = this.bikeService.isLoading;
  protected readonly error = this.bikeService.error;
  protected readonly unavailableImageIds = signal<Set<string>>(new Set());

  constructor() {
    this.bikeService.loadBikes();
  }

  protected markImageUnavailable(id: string): void {
    this.unavailableImageIds.update((ids) => new Set(ids).add(id));
  }
}
