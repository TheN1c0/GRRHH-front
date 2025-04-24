import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // header.component.ts
  @Output() menuToggled = new EventEmitter<void>();

  toggleSidebar() {
    this.menuToggled.emit(); // "¡Hey Layout! alguien hizo clic"
  }
}
