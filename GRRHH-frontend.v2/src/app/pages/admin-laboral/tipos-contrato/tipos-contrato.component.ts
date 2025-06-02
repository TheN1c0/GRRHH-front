import { Component, OnInit } from '@angular/core';
import { ContratoConfigService } from '../../../services/contrato-config.service';

@Component({
  selector: 'app-tipos-contrato',
  templateUrl: './tipos-contrato.component.html',
  styleUrl: './tipos-contrato.component.scss',
})
export class TiposContratoComponent implements OnInit {
  reglas: any[] = [];
  tiposContrato: any[] = [];
  nuevoTipoContrato = {
    nombre: '',
    reglas: null,
  };
  cargandoTipos = false;
  errorTipos = false;

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
    this.cargarTiposContrato();
  }

  cargarReglas() {
    this.contratoConfig
      .getReglas()
      .subscribe((data: any) => (this.reglas = data));
  }

  agregarRegla() {
    if (!(this.nuevaRegla['nombre'] || '').trim()) return;

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
      this.contratoConfig
        .eliminarRegla(id)
        .subscribe(() => this.cargarReglas());
    }
  }
  formatearTexto(texto: string): string {
    return texto
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (letra) => letra.toUpperCase());
  }
  getClaves(obj: any): string[] {
    return Object.keys(obj).filter((k) => k !== 'id' && k !== 'nombre');
  }

  agregarTipoContrato() {
    if (!this.nuevoTipoContrato.nombre || !this.nuevoTipoContrato.reglas)
      return;

    this.contratoConfig.crearTipo(this.nuevoTipoContrato).subscribe(() => {
      this.nuevoTipoContrato = { nombre: '', reglas: null };
      this.cargarTiposContrato();
    });
  }
  tipoEditando: any = null;

  editarTipo(tipo: any) {
    this.tipoEditando = { ...tipo };
  }

  cancelarEdicionTipo() {
    this.tipoEditando = null;
  }
  cargarTiposContrato() {
    this.cargandoTipos = true;
    this.errorTipos = false;

    this.contratoConfig.getTipos().subscribe({
      next: (data: any) => {
        this.tiposContrato = data;
        this.cargandoTipos = false;
      },
      error: (err) => {
        console.error('Error al cargar tipos de contrato:', err);
        this.errorTipos = true;
        this.cargandoTipos = false;
      },
    });
  }

  eliminarTipoContrato(id: number) {
    if (confirm('¿Eliminar este tipo de contrato?')) {
      this.contratoConfig.eliminarTipo(id).subscribe(() => {
        this.cargarTiposContrato(); // Refresca la lista
      });
    }
  }

  guardarEdicionTipo() {
    this.contratoConfig
      .editarTipo(this.tipoEditando.id, this.tipoEditando)
      .subscribe(() => {
        this.tipoEditando = null;
        this.cargarTiposContrato();
      });
  }
  tipoParaEditarReglas: any = null;

  abrirModalReglas(tipo: any) {
    this.contratoConfig
      .getReglaPorId(tipo.reglas)
      .subscribe((reglaCompleta: any) => {
        this.tipoParaEditarReglas = {
          ...tipo,
          ...reglaCompleta,
        };
      });
  }

  cerrarModalReglas() {
    this.tipoParaEditarReglas = null;
  }

  guardarReglasEditadas() {
    if (!this.tipoParaEditarReglas) return;

    // Primero actualiza los campos booleanos en la entidad de regla
    const reglaActualizada = {
      nombre: this.tipoParaEditarReglas.reglas_nombre,
      requiere_cotizaciones: this.tipoParaEditarReglas.requiere_cotizaciones,
      controla_asistencia: this.tipoParaEditarReglas.controla_asistencia,
      requiere_liquidacion: this.tipoParaEditarReglas.requiere_liquidacion,
      genera_vacaciones: this.tipoParaEditarReglas.genera_vacaciones,
      afecta_antiguedad: this.tipoParaEditarReglas.afecta_antiguedad,
      requiere_firma_digital: this.tipoParaEditarReglas.requiere_firma_digital,
      aplica_seguro_invalidez:
        this.tipoParaEditarReglas.aplica_seguro_invalidez,
    };

    // Llamar al servicio para actualizar la regla
    this.contratoConfig
      .editarRegla(this.tipoParaEditarReglas.reglas, reglaActualizada)
      .subscribe(() => {
        this.tipoParaEditarReglas = null;
        this.cargarTiposContrato();
      });
  }
}
