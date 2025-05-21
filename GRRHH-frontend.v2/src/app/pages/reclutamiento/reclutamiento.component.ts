import { Component } from '@angular/core';

@Component({
  selector: 'app-reclutamiento',
  templateUrl: './reclutamiento.component.html',
  styleUrl: './reclutamiento.component.scss',
})
export class ReclutamientoComponent {
  modo: 'formulario' | 'listado' | 'contratar' | null = null;
}
