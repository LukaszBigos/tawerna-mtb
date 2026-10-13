import { Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  // Receiving the open state as a read-only signal input (Props)
  isOpen = input.required<boolean>();

  // Emitting events up to the parent component
  toggleRequested = output<void>();
  closeRequested = output<void>();
  addRequested = output<void>();
}
