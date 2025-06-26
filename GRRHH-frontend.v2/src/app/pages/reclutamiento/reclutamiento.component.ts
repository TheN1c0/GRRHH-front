import { Component } from '@angular/core';
import { SeguridadService } from '../../services/seguridad.service';
@Component({
  selector: 'app-reclutamiento',
  templateUrl: './reclutamiento.component.html',
  styleUrl: './reclutamiento.component.scss',
})
export class ReclutamientoComponent {
  modo: 'formulario' | 'listado' | 'contratar' | null = null;
  constructor(public seguridadService: SeguridadService) {}
  postulanteSeleccionado: any = null;
}
