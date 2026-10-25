import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { DifficultyLevel } from '../../shared/models/location.model';

@Component({
  selector: 'app-trail-difficulty-filter',
  standalone: true,
  imports: [NgClass, TranslatePipe],
  templateUrl: './trail-difficulty-filter.component.html',
})
export class TrailDifficultyFilterComponent {
  public readonly selectedDifficulties = input<DifficultyLevel[]>([]);
  public readonly difficultyToggled = output<DifficultyLevel>();
  public readonly difficulties = Object.values(DifficultyLevel);
}
