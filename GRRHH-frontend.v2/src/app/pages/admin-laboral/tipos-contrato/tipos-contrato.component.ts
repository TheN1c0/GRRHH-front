import { Component, OnInit } from '@angular/core';
import { ContratoConfigService } from '../../../services/contrato-config.service';

@Component({
  selector: 'app-tipos-contrato',
  templateUrl: './tipos-contrato.component.html',
  styleUrl: './tipos-contrato.component.scss'
})
export class TiposContratoComponent implements OnInit {
  reglas: any[] = [];

  nuevaRegla: { [key: string]: any } = {
  nombre: '',
  requiere_cotizaciones: true,
  controla_asistencia: true,
  requiere_liquidacion: true,
  genera_vacaciones: true,
  afecta_antiguedad: true,
  requiere_firma_digital: false,
  aplica_seguro_invalidez: true,
};


  constructor(private contratoConfig: ContratoConfigService) {}

  ngOnInit(): void {
    this.cargarReglas();
  }

  cargarReglas() {
    this.contratoConfig.getReglas().subscribe((data: any) => (this.reglas = data));
  }

  agregarRegla() {
    if (!this.nuevaRegla.nombre.trim()) return;

    this.contratoConfig.crearRegla(this.nuevaRegla).subscribe(() => {
      this.nuevaRegla = {
        nombre: '',
        requiere_cotizaciones: true,
        controla_asistencia: true,
        requiere_liquidacion: true,
        genera_vacaciones: true,
        afecta_antiguedad: true,
        requiere_firma_digital: false,
        aplica_seguro_invalidez: true,
      };
      this.cargarReglas();
    });
  }

  eliminarRegla(id: number) {
    if (confirm('¿Eliminar esta regla?')) {
      this.contratoConfig.eliminarRegla(id).subscribe(() => this.cargarReglas());
    }
  }
  formatearTexto(texto: string): string {
  return texto
    .replace(/_/g, ' ')
    .replace(/\b\w/g, letra => letra.toUpperCase());
}
getClaves(obj: any): string[] {
  return Object.keys(obj);
}

}
