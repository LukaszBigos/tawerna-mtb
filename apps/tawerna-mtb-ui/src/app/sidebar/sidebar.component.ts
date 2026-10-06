import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  // Receiving the open state as a read-only signal input (Props)
  isOpen = input.required<boolean>();

  // Emitting events up to the parent component
  toggleRequested = output<void>();
  closeRequested = output<void>();
}
