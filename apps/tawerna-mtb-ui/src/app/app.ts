import { Component, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LocationService } from './core/services/location.service';
import { AddEntryDialogComponent } from './features/add-entry/add-entry-dialog.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { SidebarComponent } from './features/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddEntryDialogComponent, DashboardComponent, SidebarComponent, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  protected readonly locationService = inject(LocationService);
  protected readonly translate = inject(TranslateService);
  private readonly title = inject(Title);
  public readonly isSidebarOpen = signal(false);
  public readonly isAddDialogOpen = signal(false);
  public readonly languages = [
    { code: 'pl', label: 'Polski', flag: '🇵🇱' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ] as const;

  constructor() {
    this.locationService.loadLocations();
    this.translate.addLangs(this.languages.map(({ code }) => code));
    this.translate.setFallbackLang('pl').subscribe();

    const savedLanguage = localStorage.getItem('tawerna-mtb-language');
    const browserLanguage = this.translate.getBrowserLang();
    const initialLanguage = this.languages.some(({ code }) => code === savedLanguage)
      ? savedLanguage!
      : this.languages.some(({ code }) => code === browserLanguage)
        ? browserLanguage!
        : 'pl';

    this.setLanguage(initialLanguage);
  }

  public setLanguage(language: string): void {
    if (!this.languages.some(({ code }) => code === language)) return;
    localStorage.setItem('tawerna-mtb-language', language);
    document.documentElement.lang = language;
    this.translate.use(language).subscribe(() => {
      this.title.setTitle(this.translate.instant('brand.name'));
    });
  }

  public toggleSidebar(): void {
    this.isSidebarOpen.update((state) => !state);
  }

  public closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }

  public openAddDialog(): void {
    this.isAddDialogOpen.set(true);
  }

  public closeAddDialog(): void {
    this.isAddDialogOpen.set(false);
  }
}
