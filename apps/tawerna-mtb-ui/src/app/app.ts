import { Component, inject, signal } from '@angular/core';
import { LocationService } from './core/services/location.service';
import { MapComponent } from './features/dashboard/map.component';
import { SidebarComponent } from './features/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapComponent, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  protected readonly locationService = inject(LocationService);
  public readonly isSidebarOpen = signal(false);

  constructor() {
    this.locationService.loadLocations();
  }

  public toggleSidebar(): void {
    this.isSidebarOpen.update((state) => !state);
  }

  public closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }
}
