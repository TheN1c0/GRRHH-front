import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { EmpleadoFormularioComponent } from '../../formularios/empleado-formulario/empleado-formulario.component';
import { Empleado } from '../../interfaces/empleado.model';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.scss'],
})
export class ColaboradoresComponent implements OnInit {
  colaboradores: any[] = [];
  mostrarModalEmpleado = false;
  modoFormulario: 'crear' | 'editar' = 'crear';
  colaboradorSeleccionado: any = null;
  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe({
      next: (data) => {
        this.colaboradores = data; // ✅ Guardamos todos los datos del backend
      },
      error: (error) => {
        console.error('Error al cargar empleados:', error);
      },
    });
  }

  confirmarDesvincular(colaborador: any) {
    this.colaboradores.forEach((c) => (c.confirmar = false));
    colaborador.confirmar = true;
  }

  desvincular(colaborador: any) {
    console.log('Desvinculando a:', colaborador.nombre);
    colaborador.confirmar = false;
    // Aquí iría la lógica real para desvincular llamando al backend
  }

  toggleConfirm(colaborador: any) {
    this.colaboradores.forEach((c) => {
      if (c !== colaborador) c.confirmar = false;
    });
    colaborador.confirmar = !colaborador.confirmar;
  }

  refrescarEmpleados() {
    // Aquí puedes volver a hacer GET a empleados si quieres actualizar la tabla
  }

  abrirModalCrear() {
    this.modoFormulario = 'crear';
    this.colaboradorSeleccionado = null;
    this.mostrarModalEmpleado = true;
  }

  abrirModalEditar(colaborador: any) {
    this.modoFormulario = 'editar';
    this.colaboradorSeleccionado = colaborador;
    console.log(this.colaboradorSeleccionado);
    this.mostrarModalEmpleado = true;
  }
}
