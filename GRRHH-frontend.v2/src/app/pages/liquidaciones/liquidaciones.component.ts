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
  contratos: any[] = [];

  ngOnInit() {
    this.http
      .get(`${environment.personalUrl}/contratos/lista-empleados/`, {
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.contratos = res;
      });
  }
  agregarHaber() {
    this.form.haberes.push({ nombre: '', tipo: 'imponible', monto: 0 });
  }

  agregarDescuento() {
    this.form.descuentos.push({ tipo: '', monto: 0, descripcion: '' });
  }

  generarLiquidacion() {
    console.log('Formulario enviado:', this.form);
    this.form.contrato_id = Number(this.form.contrato_id);

    this.http
      .post(`${environment.personalUrl}/liquidaciones/generar/`, this.form, {
        responseType: 'blob',
      })
      .subscribe({
        next: (blob: Blob) => {
          const a = document.createElement('a');
          const url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = 'liquidacion.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => {
          console.error(err);
          alert('Error al generar la liquidación');
        },
      });
  }
}
