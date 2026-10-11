import { Component, inject, signal } from '@angular/core';
import { LocationService } from '../../core/services/location.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MapComponent } from './map.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MapComponent, SidebarComponent],
  template: `
    <div class="flex h-screen min-h-screen overflow-hidden bg-zinc-950 text-zinc-50">
      <app-sidebar
        [isOpen]="isSidebarOpen()"
        (toggleRequested)="toggleSidebar()"
        (closeRequested)="closeSidebar()"
      ></app-sidebar>

      <main class="relative min-w-0 flex-1 overflow-hidden bg-zinc-950 p-3 sm:p-4">
        <div
          class="relative h-full overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900 shadow-2xl shadow-black/30"
        >
          @if (!isSidebarOpen()) {
            <button
              type="button"
              (click)="toggleSidebar()"
              class="absolute left-4 top-4 z-500 rounded-xl border border-zinc-700/70 bg-zinc-950/85 px-4 py-2 text-sm text-zinc-200 shadow-xl backdrop-blur-md transition hover:border-emerald-500/40 hover:text-emerald-400"
            >
              🌲 Otwórz sidebar
            </button>
          }

          @if (locationService.isLoading()) {
            <div
              class="absolute inset-0 z-600 flex items-center justify-center bg-zinc-950/80 backdrop-blur-md"
            >
              <div class="flex flex-col items-center gap-3">
                <div
                  class="h-10 w-10 animate-spin rounded-full border-2 border-emerald-500/20 border-t-emerald-400"
                ></div>
                <div class="text-xs tracking-[0.2em] text-zinc-400">ŁADOWANIE DANYCH</div>
              </div>
            </div>
          }

          @if (locationService.error()) {
            <div
              class="absolute inset-0 z-600 flex items-center justify-center bg-zinc-950 p-8 text-center text-zinc-300"
            >
              <div>
                <p class="text-lg font-medium text-red-400">Nie udało się załadować mapy</p>
                <p class="mt-2 text-sm text-zinc-500">{{ locationService.error() }}</p>
              </div>
            </div>
          }

          <app-map
            [locations]="locationService.locations()"
            [isSidebarOpen]="isSidebarOpen()"
          ></app-map>
        </div>
      </main>
    </div>
  `,
})
export class DashboardComponent {
  protected readonly locationService = inject(LocationService);
  public readonly isSidebarOpen = signal<boolean>(true);

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
