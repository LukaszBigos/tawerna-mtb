import { Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-filters-toggle-button',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './filters-toggle-button.component.html',
})
export class FiltersToggleButtonComponent {
  public readonly open = input.required<boolean>();
  public readonly selectedCount = input.required<number>();
  public readonly toggle = output<void>();
}
