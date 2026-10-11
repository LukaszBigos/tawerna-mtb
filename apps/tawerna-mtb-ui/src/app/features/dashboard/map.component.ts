import { Component, effect, ElementRef, inject, input, OnDestroy, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { LocationService } from '../../core/services/location.service';
import {
  DIFFICULTY_CONFIG,
  Location,
  PLACE_TYPE_CONFIG,
} from '../../shared/models/location.config';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  template: `<div #mapContainer class="h-full w-full"></div>`,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }

      :host ::ng-deep {
        .leaflet-control-zoom {
          border: none !important;
        }

        .leaflet-control-zoom-in,
        .leaflet-control-zoom-out {
          border: 1px solid #27272a !important;
          background-color: #18181b !important;
          color: #f4f4f5 !important;
        }

        .leaflet-popup-content-wrapper {
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 0.5rem;
          background: rgba(24, 24, 27, 0.9) !important;
          color: #f4f4f5 !important;
          backdrop-filter: blur(8px);
        }

        .leaflet-popup-tip {
          background: rgba(24, 24, 27, 0.9) !important;
        }
      }
    `,
  ],
})
export class MapComponent implements OnDestroy {
  private readonly locationService = inject(LocationService);
  private readonly mapContainer = viewChild.required<ElementRef<HTMLDivElement>>('mapContainer');
  private map!: L.Map;
  private readonly markerLayer = L.layerGroup();

  public readonly locations = input.required<Location[]>();
  public readonly isSidebarOpen = input<boolean>(true);

  constructor() {
    effect(() => this.initMap(this.mapContainer().nativeElement));
    effect(() => this.updateMarkers(this.locations()));

    effect(() => {
      this.isSidebarOpen();
      window.setTimeout(() => this.map?.invalidateSize(), 300);
    });
  }

  private initMap(container: HTMLDivElement): void {
    this.map = L.map(container, {
      center: [50.0647, 19.945],
      zoom: 8,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(this.map);

    this.markerLayer.addTo(this.map);
  }

  private updateMarkers(locations: Location[]): void {
    if (!this.map) {
      return;
    }

    this.markerLayer.clearLayers();

    locations.forEach((location) => {
      const typeConfig = PLACE_TYPE_CONFIG[location.type];
      const markerIcon = L.divIcon({
        className: 'location-marker-icon',
        html: `<span style="display:grid;width:44px;height:44px;place-items:center;box-sizing:border-box;border:3px solid ${typeConfig.markerColor};border-radius:50%;background:#102019;box-shadow:0 2px 8px rgba(0,0,0,.6);font-size:25px;line-height:1">${typeConfig.markerIcon}</span>`,
        iconSize: [44, 44],
        iconAnchor: [22, 22],
      });
      const marker = L.marker([location.latitude, location.longitude], {
        icon: markerIcon,
        title: location.name,
        alt: location.name,
      });
      marker.bindTooltip(location.name, {
        direction: 'top',
        offset: L.point(0, -22),
        opacity: 0.96,
      });

      const storedImageUrl = location.imageUrl?.trim();
      const hasUnsplashPageUrl = /^https?:\/\/(www\.)?unsplash\.com\/?$/i.test(
        storedImageUrl ?? '',
      );
      const imageUrl = storedImageUrl && !hasUnsplashPageUrl ? storedImageUrl : typeConfig.imageUrl;
      const imageHtml = `
        <img
          src="${imageUrl}"
          alt="${location.name}"
          width="480"
          height="240"
          loading="lazy"
          decoding="async"
          onerror="this.onerror=null;this.src='/tavern-shelter.jpg'"
          style="display:block;width:100%;height:156px;margin:0 0 10px;border-radius:8px 8px 4px 4px;object-fit:cover;object-position:center 45%;background:#182820"
        />
      `;

      const linksHtml = `
        <div class="mt-3 flex gap-3 border-t border-zinc-800/80 pt-2 text-[11px]">
          ${
            location.websiteUrl
              ? `<a href="${location.websiteUrl}" target="_blank" rel="noopener noreferrer" class="font-medium text-emerald-400 hover:underline">Website 🌐</a>`
              : ''
          }
          ${
            location.youtubeVideoUrl
              ? `<a href="${location.youtubeVideoUrl}" target="_blank" rel="noopener noreferrer" class="font-medium text-red-400 hover:underline">Video 📺</a>`
              : ''
          }
        </div>
      `;

      const trailsHtml = location.trails
        .map((trail) => {
          const config = DIFFICULTY_CONFIG[trail.difficulty];
          const lengthInKm = (trail.lengthInMeters / 1000).toFixed(1);
          return `
            <li class="flex items-center justify-between rounded border border-zinc-800/60 bg-zinc-950/80 p-1.5 text-[10px]">
              <span class="font-medium text-zinc-300">${trail.name}</span>
              <span class="rounded px-1.5 py-0.5 text-[9px] ${config.classes}">${lengthInKm} km</span>
            </li>
          `;
        })
        .join('');

      const popupContent = `
        <div class="min-w-62.5 max-w-70 p-0.5 font-sans">
          ${imageHtml}
          <div class="px-1">
            <div class="mb-1 flex items-center justify-between gap-2">
              <h3 class="text-sm font-bold text-zinc-100">${location.name}</h3>
              <span class="rounded-full border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${typeConfig.bgClass} ${typeConfig.textClass}">
                ${typeConfig.label}
              </span>
            </div>
            <p class="mb-2 text-[10px] text-zinc-400">${location.description}</p>

            <div class="border-t border-zinc-800/60 pt-2">
              <h4 class="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Trails (${location.trails.length})
              </h4>
              <ul class="max-h-25 space-y-1 overflow-y-auto pr-0.5">
                ${trailsHtml || '<li class="text-xs text-zinc-500">No trails available</li>'}
              </ul>
            </div>
            ${linksHtml}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        autoPan: true,
        autoPanPadding: L.point(24, 24),
        maxHeight: Math.max(180, this.map.getSize().y - 48),
        maxWidth: 320,
      });
      marker.on('click', () => this.locationService.selectLocation(location));
      this.markerLayer.addLayer(marker);
    });
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
