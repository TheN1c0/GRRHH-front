import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-liquidaciones',
  templateUrl: './liquidaciones.component.html',
  styleUrl: './liquidaciones.component.scss',
})
export class LiquidacionesComponent {
  form: any = {
    contrato_id: null,
    periodo_inicio: '',
    periodo_termino: '',
    gratificacion_tipo: 'legal',
    haberes: [],
    descuentos: [],
  };

  constructor(private http: HttpClient) {}

  agregarHaber() {
    this.form.haberes.push({ nombre: '', tipo: 'imponible', monto: 0 });
  }

  agregarDescuento() {
    this.form.descuentos.push({ tipo: '', monto: 0, descripcion: '' });
  }

  generarLiquidacion() {
    this.http
      .post(
        `${environment.apiUrl}personal/api/liquidaciones/generar/`,
        this.form
      )
      .subscribe({
        next: (res: any) => {
          alert('Liquidación generada con ID: ' + res.id);
        },
        error: (err) => {
          console.error(err);
          alert('Error al generar la liquidación');
        },
      });
  }
}
