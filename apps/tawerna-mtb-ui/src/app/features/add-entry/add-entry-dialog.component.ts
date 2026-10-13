import { Component, HostListener, effect, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { LocationService } from '../../core/services/location.service';
import {
  CreateLocationRequest,
  CreateTrailRequest,
  DifficultyLevel,
  Location,
  PlaceType,
} from '../../shared/models/location.model';

type AddEntryMode = 'choice' | 'location' | 'trail';

@Component({
  selector: 'app-add-entry-dialog',
  standalone: true,
  imports: [FormsModule, TranslatePipe],
  template: `
    @if (isOpen()) {
      <div
        class="fixed inset-0 z-1000 grid place-items-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
        (click)="onBackdropClick($event)"
      >
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-entry-title"
          class="my-auto w-full max-w-xl overflow-hidden rounded-xl border border-emerald-900/70 bg-[#10251b] text-zinc-100 shadow-2xl shadow-black/50"
          (click)="$event.stopPropagation()"
        >
          <header class="flex items-start justify-between border-b border-emerald-900/70 px-6 py-5">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400">
                {{ 'brand.name' | translate }}
              </p>
              <h2 id="add-entry-title" class="mt-1 font-serif text-2xl font-medium">
                @if (mode() === 'choice') {
                  {{ 'add.choiceTitle' | translate }}
                } @else if (mode() === 'location') {
                  {{ 'add.locationTitle' | translate }}
                } @else {
                  {{ 'add.trailTitle' | translate }}
                }
              </h2>
            </div>
            <button
              type="button"
              (click)="closeRequested.emit()"
              [attr.aria-label]="'add.close' | translate"
              class="grid h-9 w-9 place-items-center rounded-md text-xl text-zinc-400 hover:bg-white/10 hover:text-white"
            >
              ×
            </button>
          </header>

          @if (mode() === 'choice') {
            <div class="grid gap-3 p-6 sm:grid-cols-2">
              <button
                type="button"
                (click)="startLocation()"
                class="group rounded-lg border border-emerald-900 bg-emerald-950/40 p-5 text-left transition hover:border-emerald-500 hover:bg-emerald-950/80"
              >
                <span class="text-2xl" aria-hidden="true">⛰️</span>
                <span class="mt-4 block font-semibold">{{ 'add.locationChoice' | translate }}</span>
                <span class="mt-1 block text-sm text-zinc-400">{{
                  'add.locationChoiceHint' | translate
                }}</span>
              </button>
              <button
                type="button"
                (click)="startTrail()"
                class="group rounded-lg border border-emerald-900 bg-emerald-950/40 p-5 text-left transition hover:border-emerald-500 hover:bg-emerald-950/80"
              >
                <span class="text-2xl" aria-hidden="true">🚵</span>
                <span class="mt-4 block font-semibold">{{ 'add.trailChoice' | translate }}</span>
                <span class="mt-1 block text-sm text-zinc-400">{{
                  'add.trailChoiceHint' | translate
                }}</span>
              </button>
            </div>
          } @else if (mode() === 'location') {
            <form #locationForm="ngForm" (ngSubmit)="submitLocation()" class="space-y-4 p-6">
              <label class="block text-sm">
                <span class="mb-1.5 block text-zinc-300">{{ 'add.name' | translate }}</span>
                <input
                  [(ngModel)]="locationDraft.name"
                  name="locationName"
                  required
                  maxlength="120"
                  class="w-full rounded-md border border-zinc-700 bg-zinc-950/70 px-3 py-2.5 outline-none focus:border-emerald-500"
                  [placeholder]="'add.placeholder.locationName' | translate"
                />
              </label>
              <label class="block text-sm">
                <span class="mb-1.5 block text-zinc-300">{{ 'add.description' | translate }}</span>
                <textarea
                  [(ngModel)]="locationDraft.description"
                  name="locationDescription"
                  required
                  rows="3"
                  maxlength="1000"
                  class="w-full resize-y rounded-md border border-zinc-700 bg-zinc-950/70 px-3 py-2.5 outline-none focus:border-emerald-500"
                  [placeholder]="'add.placeholder.locationDescription' | translate"
                ></textarea>
              </label>
              <label class="block text-sm">
                <span class="mb-1.5 block text-zinc-300">{{ 'add.locationType' | translate }}</span>
                <select
                  [(ngModel)]="locationDraft.type"
                  name="locationType"
                  required
                  class="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2.5 outline-none focus:border-emerald-500"
                >
                  <option [ngValue]="PlaceType.MOUNTAIN_TRAIL">
                    {{ 'add.mountain' | translate }}
                  </option>
                  <option [ngValue]="PlaceType.BIKE_PARK">{{ 'add.bikePark' | translate }}</option>
                  <option [ngValue]="PlaceType.TRAIL_CENTER">
                    {{ 'add.trailCenter' | translate }}
                  </option>
                </select>
              </label>
              <div class="grid grid-cols-2 gap-3">
                <label class="block text-sm">
                  <span class="mb-1.5 block text-zinc-300">{{ 'add.latitude' | translate }}</span>
                  <input
                    [(ngModel)]="locationDraft.latitude"
                    name="latitude"
                    type="number"
                    min="-90"
                    max="90"
                    step="any"
                    required
                    class="w-full rounded-md border border-zinc-700 bg-zinc-950/70 px-3 py-2.5 outline-none focus:border-emerald-500"
                  />
                </label>
                <label class="block text-sm">
                  <span class="mb-1.5 block text-zinc-300">{{ 'add.longitude' | translate }}</span>
                  <input
                    [(ngModel)]="locationDraft.longitude"
                    name="longitude"
                    type="number"
                    min="-180"
                    max="180"
                    step="any"
                    required
                    class="w-full rounded-md border border-zinc-700 bg-zinc-950/70 px-3 py-2.5 outline-none focus:border-emerald-500"
                  />
                </label>
              </div>
              <label class="block text-sm">
                <span class="mb-1.5 block text-zinc-300"
                  >{{ 'add.website' | translate }}
                  <span class="text-zinc-500">({{ 'add.optional' | translate }})</span></span
                >
                <input
                  [(ngModel)]="locationDraft.websiteUrl"
                  name="websiteUrl"
                  type="url"
                  class="w-full rounded-md border border-zinc-700 bg-zinc-950/70 px-3 py-2.5 outline-none focus:border-emerald-500"
                  [placeholder]="'add.placeholder.url' | translate"
                />
              </label>
              <div class="grid gap-3 sm:grid-cols-2">
                <label class="block text-sm">
                  <span class="mb-1.5 block text-zinc-300"
                    >{{ 'add.youtube' | translate }}
                    <span class="text-zinc-500">({{ 'add.optional' | translate }})</span></span
                  >
                  <input
                    [(ngModel)]="locationDraft.youtubeVideoUrl"
                    name="locationYoutubeUrl"
                    type="url"
                    class="w-full rounded-md border border-zinc-700 bg-zinc-950/70 px-3 py-2.5 outline-none focus:border-emerald-500"
                    [placeholder]="'add.placeholder.youtube' | translate"
                  />
                </label>
                <label class="block text-sm">
                  <span class="mb-1.5 block text-zinc-300"
                    >{{ 'add.image' | translate }}
                    <span class="text-zinc-500">({{ 'add.optional' | translate }})</span></span
                  >
                  <input
                    [(ngModel)]="locationDraft.imageUrl"
                    name="locationImageUrl"
                    type="url"
                    class="w-full rounded-md border border-zinc-700 bg-zinc-950/70 px-3 py-2.5 outline-none focus:border-emerald-500"
                    [placeholder]="'add.placeholder.image' | translate"
                  />
                </label>
              </div>
              @if (saveError()) {
                <p role="alert" class="text-sm text-red-300">{{ saveError() | translate }}</p>
              }
              <div class="flex justify-between border-t border-emerald-900/70 pt-4">
                <button
                  type="button"
                  (click)="mode.set('choice')"
                  class="px-3 py-2 text-sm text-zinc-300 hover:text-white"
                >
                  {{ 'add.back' | translate }}
                </button>
                <button
                  type="submit"
                  [disabled]="locationForm.invalid || isSaving()"
                  class="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {{ (isSaving() ? 'add.saving' : 'add.addLocation') | translate }}
                </button>
              </div>
            </form>
          } @else {
            @if (locations().length === 0) {
              <div class="space-y-4 p-6">
                <p class="text-sm leading-6 text-zinc-300">
                  {{ 'add.noLocations' | translate }}
                </p>
                <button
                  type="button"
                  (click)="startLocation()"
                  class="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-500"
                >
                  {{ 'add.addLocation' | translate }}
                </button>
              </div>
            } @else {
              <form #trailForm="ngForm" (ngSubmit)="submitTrail()" class="space-y-4 p-6">
                <label class="block text-sm">
                  <span class="mb-1.5 block text-zinc-300">{{
                    'add.parentLocation' | translate
                  }}</span>
                  <select
                    [(ngModel)]="trailDraft.locationId"
                    name="parentLocation"
                    required
                    class="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2.5 outline-none focus:border-emerald-500"
                  >
                    <option [ngValue]="null" disabled>
                      {{ 'add.chooseLocation' | translate }}
                    </option>
                    @for (location of locations(); track location.id) {
                      <option [ngValue]="location.id">{{ location.name }}</option>
                    }
                  </select>
                </label>
                <label class="block text-sm">
                  <span class="mb-1.5 block text-zinc-300">{{ 'add.trailName' | translate }}</span>
                  <input
                    [(ngModel)]="trailDraft.name"
                    name="trailName"
                    required
                    maxlength="120"
                    class="w-full rounded-md border border-zinc-700 bg-zinc-950/70 px-3 py-2.5 outline-none focus:border-emerald-500"
                    [placeholder]="'add.placeholder.trailName' | translate"
                  />
                </label>
                <div class="grid grid-cols-2 gap-3">
                  <label class="block text-sm">
                    <span class="mb-1.5 block text-zinc-300">{{ 'add.length' | translate }}</span>
                    <input
                      [(ngModel)]="trailDraft.lengthInMeters"
                      name="lengthInMeters"
                      type="number"
                      min="1"
                      step="1"
                      required
                      class="w-full rounded-md border border-zinc-700 bg-zinc-950/70 px-3 py-2.5 outline-none focus:border-emerald-500"
                    />
                  </label>
                  <label class="block text-sm">
                    <span class="mb-1.5 block text-zinc-300">{{
                      'add.difficulty' | translate
                    }}</span>
                    <select
                      [(ngModel)]="trailDraft.difficulty"
                      name="difficulty"
                      required
                      class="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2.5 outline-none focus:border-emerald-500"
                    >
                      <option [ngValue]="DifficultyLevel.GREEN">
                        {{ 'difficulty.GREEN' | translate }}
                      </option>
                      <option [ngValue]="DifficultyLevel.BLUE_FLOW">
                        {{ 'difficulty.BLUE_FLOW' | translate }}
                      </option>
                      <option [ngValue]="DifficultyLevel.RED_TECH">
                        {{ 'difficulty.RED_TECH' | translate }}
                      </option>
                      <option [ngValue]="DifficultyLevel.BLACK_DH">
                        {{ 'difficulty.BLACK_DH' | translate }}
                      </option>
                    </select>
                  </label>
                </div>
                <label class="block text-sm">
                  <span class="mb-1.5 block text-zinc-300"
                    >{{ 'add.description' | translate }}
                    <span class="text-zinc-500">({{ 'add.optional' | translate }})</span></span
                  >
                  <textarea
                    [(ngModel)]="trailDraft.description"
                    name="trailDescription"
                    rows="2"
                    maxlength="1000"
                    class="w-full resize-y rounded-md border border-zinc-700 bg-zinc-950/70 px-3 py-2.5 outline-none focus:border-emerald-500"
                  ></textarea>
                </label>
                <div class="grid gap-3 sm:grid-cols-2">
                  <label class="block text-sm">
                    <span class="mb-1.5 block text-zinc-300"
                      >{{ 'add.trailforks' | translate }}
                      <span class="text-zinc-500">({{ 'add.optional' | translate }})</span></span
                    >
                    <input
                      [(ngModel)]="trailDraft.trailforksUrl"
                      name="trailforksUrl"
                      type="url"
                      class="w-full rounded-md border border-zinc-700 bg-zinc-950/70 px-3 py-2.5 outline-none focus:border-emerald-500"
                      [placeholder]="'add.placeholder.trailforks' | translate"
                    />
                  </label>
                  <label class="block text-sm">
                    <span class="mb-1.5 block text-zinc-300"
                      >{{ 'add.youtube' | translate }}
                      <span class="text-zinc-500">({{ 'add.optional' | translate }})</span></span
                    >
                    <input
                      [(ngModel)]="trailDraft.youtubeVideoUrl"
                      name="trailYoutubeUrl"
                      type="url"
                      class="w-full rounded-md border border-zinc-700 bg-zinc-950/70 px-3 py-2.5 outline-none focus:border-emerald-500"
                      [placeholder]="'add.placeholder.youtube' | translate"
                    />
                  </label>
                </div>
                <label class="block text-sm">
                  <span class="mb-1.5 block text-zinc-300"
                    >{{ 'add.image' | translate }}
                    <span class="text-zinc-500">({{ 'add.optional' | translate }})</span></span
                  >
                  <input
                    [(ngModel)]="trailDraft.imageUrl"
                    name="trailImageUrl"
                    type="url"
                    class="w-full rounded-md border border-zinc-700 bg-zinc-950/70 px-3 py-2.5 outline-none focus:border-emerald-500"
                    [placeholder]="'add.placeholder.image' | translate"
                  />
                </label>
                @if (saveError()) {
                  <p role="alert" class="text-sm text-red-300">{{ saveError() | translate }}</p>
                }
                <div class="flex justify-between border-t border-emerald-900/70 pt-4">
                  <button
                    type="button"
                    (click)="mode.set('choice')"
                    class="px-3 py-2 text-sm text-zinc-300 hover:text-white"
                  >
                    {{ 'add.back' | translate }}
                  </button>
                  <button
                    type="submit"
                    [disabled]="trailForm.invalid || isSaving()"
                    class="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {{ (isSaving() ? 'add.saving' : 'add.addTrail') | translate }}
                  </button>
                </div>
              </form>
            }
          }
        </section>
      </div>
    }
  `,
})
export class AddEntryDialogComponent {
  private readonly locationService = inject(LocationService);

  public readonly isOpen = input.required<boolean>();
  public readonly locations = input.required<Location[]>();
  public readonly closeRequested = output<void>();
  public readonly mode = signal<AddEntryMode>('choice');
  public readonly isSaving = signal(false);
  public readonly saveError = signal<string | null>(null);
  public readonly PlaceType = PlaceType;
  public readonly DifficultyLevel = DifficultyLevel;

  public locationDraft: Omit<CreateLocationRequest, 'latitude' | 'longitude'> & {
    latitude: number | null;
    longitude: number | null;
  } = {
    name: '',
    description: '',
    latitude: null,
    longitude: null,
    type: PlaceType.MOUNTAIN_TRAIL,
  };

  public trailDraft: CreateTrailRequest & { locationId: number | null } = {
    name: '',
    lengthInMeters: 1000,
    difficulty: DifficultyLevel.BLUE_FLOW,
    locationId: null,
  };

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        this.mode.set('choice');
        this.saveError.set(null);
      }
    });
  }

  public startLocation(): void {
    this.saveError.set(null);
    this.mode.set('location');
  }

  public startTrail(): void {
    this.saveError.set(null);
    this.trailDraft.locationId = this.locations()[0]?.id ?? null;
    this.mode.set('trail');
  }

  public submitLocation(): void {
    if (
      this.isSaving() ||
      this.locationDraft.latitude === null ||
      this.locationDraft.longitude === null
    ) {
      return;
    }
    this.isSaving.set(true);
    this.saveError.set(null);

    this.locationService
      .createLocation({
        ...this.locationDraft,
        latitude: Number(this.locationDraft.latitude),
        longitude: Number(this.locationDraft.longitude),
        name: this.locationDraft.name.trim(),
        description: this.locationDraft.description.trim(),
        websiteUrl: this.normalizeOptional(this.locationDraft.websiteUrl),
        youtubeVideoUrl: this.normalizeOptional(this.locationDraft.youtubeVideoUrl),
        imageUrl: this.normalizeOptional(this.locationDraft.imageUrl),
      })
      .pipe(finalize(() => this.isSaving.set(false)))
      .subscribe({
        next: () => this.closeRequested.emit(),
        error: () => this.saveError.set('errors.saveLocation'),
      });
  }

  public submitTrail(): void {
    if (this.isSaving() || this.trailDraft.locationId === null) return;
    this.isSaving.set(true);
    this.saveError.set(null);

    const { locationId, ...request } = this.trailDraft;
    this.locationService
      .createTrail(locationId, {
        ...request,
        name: request.name.trim(),
        trailforksUrl: this.normalizeOptional(request.trailforksUrl),
        youtubeVideoUrl: this.normalizeOptional(request.youtubeVideoUrl),
        description: this.normalizeOptional(request.description),
        imageUrl: this.normalizeOptional(request.imageUrl),
      })
      .pipe(finalize(() => this.isSaving.set(false)))
      .subscribe({
        next: () => this.closeRequested.emit(),
        error: () => this.saveError.set('errors.saveTrail'),
      });
  }

  public onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.closeRequested.emit();
  }

  @HostListener('document:keydown.escape')
  public onEscape(): void {
    if (this.isOpen()) this.closeRequested.emit();
  }

  private normalizeOptional(value: string | null | undefined): string | null {
    return value?.trim() || null;
  }
}
