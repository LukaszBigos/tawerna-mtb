import { Component, effect, ElementRef, inject, input, OnDestroy, viewChild } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { TranslateService } from '@ngx-translate/core';
import { LocationService } from '../../core/services/location.service';
import {
  DIFFICULTY_CONFIG,
  Location,
  PLACE_TYPE_CONFIG,
} from '../../shared/models/location.config';

@Component({
  selector: 'app-map',
  standalone: true,
  host: { class: 'block h-full w-full' },
  templateUrl: './map.component.html',
})
export class MapComponent implements OnDestroy {
  private readonly locationService = inject(LocationService);
  private readonly translate = inject(TranslateService);
  private readonly mapContainer = viewChild.required<ElementRef<HTMLDivElement>>('mapContainer');
  private map!: L.Map;
  private topographicLayer!: L.TileLayer;
  private standardLayer!: L.TileLayer;
  private layerControl?: L.Control.Layers;
  private resizeObserver?: ResizeObserver;
  private readonly markersByLocation = new Map<number, L.Marker>();
  private pendingFocusLocationId?: number;
  private readonly markerLayer = L.markerClusterGroup({
    chunkedLoading: true,
    maxClusterRadius: 48,
    showCoverageOnHover: false,
    spiderfyOnMaxZoom: true,
    iconCreateFunction: (cluster) =>
      L.divIcon({
        className: 'location-cluster !border-0 !bg-transparent',
        html: `<span class="grid h-10.5 w-10.5 place-items-center rounded-full border-2 border-[#f3e8d2] bg-[#176b50] text-[13px] font-bold leading-none text-white shadow-lg">${cluster.getChildCount()}</span>`,
        iconSize: [42, 42],
        iconAnchor: [21, 21],
      }),
  });

  public readonly locations = input.required<Location[]>();

  constructor() {
    effect(() => {
      const container = this.mapContainer().nativeElement;
      if (!this.map) this.initMap(container);
    });
    effect(() => {
      this.translate.currentLang();
      this.updateMarkers(this.locations());
      this.updateLayerControl();
    });

    effect(() => {
      const selectedLocation = this.locationService.selectedLocation();
      if (selectedLocation) {
        this.focusLocation(selectedLocation.id);
      }
    });
  }

  public focusLocation(locationId: number): void {
    const marker = this.markersByLocation.get(locationId);
    if (!marker || !this.map) {
      this.pendingFocusLocationId = locationId;
      return;
    }
    this.pendingFocusLocationId = undefined;
    this.map.flyTo(marker.getLatLng(), Math.max(this.map.getZoom(), 11), { duration: 0.5 });
    setTimeout(() => marker.openPopup(), 600);
  }

  private initMap(container: HTMLDivElement): void {
    this.map = L.map(container, {
      center: [50.0647, 19.945],
      zoom: 8,
      zoomControl: true,
    });
    this.resizeObserver = new ResizeObserver(() => {
      if (container.clientWidth > 0 && container.clientHeight > 0) {
        this.map.invalidateSize({ animate: false });
      }
    });
    this.resizeObserver.observe(container);

    this.topographicLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors, SRTM | &copy; OpenTopoMap',
      maxZoom: 17,
    });
    this.standardLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    });

    this.standardLayer.addTo(this.map);
    this.updateLayerControl();
    this.applyZoomControlUtilities();

    this.markerLayer.addTo(this.map);
  }

  private updateMarkers(locations: Location[]): void {
    if (!this.map) {
      return;
    }

    this.markerLayer.clearLayers();
    this.markersByLocation.clear();

    locations.forEach((location) => {
      const typeConfig = PLACE_TYPE_CONFIG[location.type];
      const typeLabel = this.translate.instant(`map.type.${location.type}`) as string;
      const markerColorClass = {
        BIKE_PARK: 'border-emerald-500',
        MOUNTAIN_TRAIL: 'border-orange-500',
        TRAIL_CENTER: 'border-sky-400',
      }[location.type];
      const markerIcon = L.divIcon({
        className: 'location-marker-icon !border-0 !bg-transparent',
        html: `<span class="grid h-10 w-10 place-items-center rounded-full border-[3px] ${markerColorClass} bg-[#102019] text-[22px] leading-none shadow-lg">${typeConfig.markerIcon}</span>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
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
          class="mb-2 block h-39 w-full rounded-t-lg rounded-b-sm bg-[#182820] object-cover object-[center_45%]"
        />
      `;

      const linksHtml = `
        <div class="mt-3 flex gap-3 border-t border-zinc-800/80 pt-2 text-[11px]">
          ${
            location.websiteUrl
              ? `<a href="${location.websiteUrl}" target="_blank" rel="noopener noreferrer" class="font-medium text-emerald-400 hover:underline">${this.translate.instant('map.website')} 🌐</a>`
              : ''
          }
          ${
            location.youtubeVideoUrl
              ? `<a href="${location.youtubeVideoUrl}" target="_blank" rel="noopener noreferrer" class="font-medium text-red-400 hover:underline">${this.translate.instant('map.video')} 📺</a>`
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
              <span class="rounded px-1.5 py-0.5 text-[9px] ${config.classes}">${this.translate.instant(`difficulty.${trail.difficulty}`)} · ${lengthInKm} km</span>
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
                ${typeLabel}
              </span>
            </div>
            <p class="mb-2 text-[10px] text-zinc-400">${location.description}</p>

            <div class="border-t border-zinc-800/60 pt-2">
              <h4 class="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                ${this.translate.instant('map.trails')} (${location.trails.length})
              </h4>
              <ul class="max-h-25 space-y-1 overflow-y-auto pr-0.5">
                ${trailsHtml || `<li class="text-xs text-zinc-500">${this.translate.instant('map.noTrails')}</li>`}
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
      marker.on('popupopen', (event) => this.applyPopupUtilities(event.popup));
      marker.on('click', () => this.locationService.selectLocation(location));
      this.markerLayer.addLayer(marker);
      this.markersByLocation.set(location.id, marker);
    });

    const selected = this.locationService.selectedLocation();
    const focusId = selected?.id ?? this.pendingFocusLocationId;
    if (focusId !== undefined && this.markersByLocation.has(focusId) && this.map) {
      this.focusLocation(focusId);
    }
  }

  private updateLayerControl(): void {
    if (!this.map || !this.topographicLayer || !this.standardLayer) return;

    this.layerControl?.remove();
    this.layerControl = L.control
      .layers(
        {
          [this.translate.instant('map.layers.standard') as string]: this.standardLayer,
          [this.translate.instant('map.layers.topographic') as string]: this.topographicLayer,
        },
        undefined,
        { collapsed: true, position: 'topright' },
      )
      .addTo(this.map);
    const layerContainer = this.layerControl?.getContainer();
    layerContainer?.classList.add(
      '!rounded-xl',
      '!bg-[#102019]/70',
      '!text-[#e7eee8]',
      '!shadow-sm',
      'backdrop-blur-md',
      '!border-0',
      '!outline-none',
    );
    layerContainer?.querySelectorAll('input[type="radio"]').forEach((input) => {
      input.classList.add('accent-emerald-500');
    });
    layerContainer?.querySelectorAll('label').forEach((label) => {
      label.classList.add('!text-[#e7eee8]', '!text-xs', 'cursor-pointer');
    });
  }

  private applyZoomControlUtilities(): void {
    this.map
      .getContainer()
      .querySelectorAll('.leaflet-control-zoom-in, .leaflet-control-zoom-out')
      .forEach((control) => {
        control.classList.add('!border', '!border-[#27272a]', '!bg-[#18181b]', '!text-[#f4f4f5]');
      });
  }

  private applyPopupUtilities(popup: L.Popup): void {
    const popupElement = popup.getElement();
    popupElement
      ?.querySelector('.leaflet-popup-content-wrapper')
      ?.classList.add(
        '!border',
        '!border-emerald-500/20',
        '!rounded-lg',
        '!bg-[#18181b]/90',
        '!text-[#f4f4f5]',
        '!backdrop-blur-md',
      );
    popupElement?.querySelector('.leaflet-popup-tip')?.classList.add('!bg-[#18181b]/90');
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.map?.remove();
  }
}
