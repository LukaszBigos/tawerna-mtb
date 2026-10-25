import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PlaceType } from '../../shared/models/location.model';

@Component({
  selector: 'app-place-type-filter',
  standalone: true,
  imports: [NgClass, TranslatePipe],
  templateUrl: './place-type-filter.component.html',
})
export class PlaceTypeFilterComponent {
  public readonly selectedTypes = input<PlaceType[]>([]);
  public readonly typeToggled = output<PlaceType>();
  public readonly clearRequested = output<void>();
  public readonly placeTypes = Object.values(PlaceType);
}
