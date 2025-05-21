import { Component, OnInit } from '@angular/core';
import { ReporteService, ReporteMensual } from '../../services/reporte.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss',
})
export class ReportesComponent implements OnInit {
  reporte: ReporteMensual | null = null;
  cargando = true;

  tarjetas = [
    {
      id: 1,
      titulo: '👥 Empleados pagados',
      valor: 0,
      clave: 'empleados_pagados',
      tipo: 'numero',
      detalle: 'Empleados con liquidación registrada este mes',
    },
    {
      id: 2,
      titulo: '💰 Sueldo bruto total',
      valor: 0,
      clave: 'sueldo_bruto_total',
      tipo: 'clp',
      detalle: 'Suma de todos los sueldos brutos',
    },
    {
      id: 3,
      titulo: '📉 Total descuentos',
      valor: 0,
      clave: 'total_descuentos',
      tipo: 'clp',
      detalle: 'Incluye AFP, salud, cesantía y otros',
    },
    {
      id: 4,
      titulo: '💵 Sueldo líquido total',
      valor: 0,
      clave: 'sueldo_liquido_total',
      tipo: 'clp',
      detalle: 'Suma total de pagos netos realizados',
    },
    {
      id: 5,
      titulo: '📈 Porcentaje pagado',
      valor: 0,
      clave: 'porcentaje_pagado',
      tipo: 'porcentaje',
      detalle: 'Proporción pagada respecto a empleados contratados',
    },
    {
      id: 6,
      titulo: '🚫 Ausentismo laboral',
      valor: 0,
      clave: 'ausentismo_laboral',
      tipo: 'porcentaje',
      detalle: 'Porcentaje de días laborales no asistidos',
    },
  ];

  tarjetaActiva: any = null;

  constructor(private reporteService: ReporteService) {}

  ngOnInit(): void {
    const hoy = new Date();
    const mes = hoy.getMonth() + 1;
    const anio = hoy.getFullYear();

    this.reporteService.obtenerReporte(mes, anio).subscribe({
      next: (data) => {
        this.reporte = data;

        // Actualiza valores reales en cada tarjeta
        this.tarjetas = this.tarjetas.map((t) => ({
          ...t,
          valor: data[t.clave as keyof ReporteMensual] || 0,
        }));

        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar el reporte:', error);
        this.cargando = false;
      },
    });
  }

  expandirTarjeta(tarjeta: any) {
    this.tarjetaActiva = tarjeta;
  }

  cerrarDetalle() {
    this.tarjetaActiva = null;
  }
}
