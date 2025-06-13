import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { EmpleadoFormularioComponent } from '../../formularios/empleado-formulario/empleado-formulario.component';
import { Empleado } from '../../interfaces/empleado.model';
import { Departamento } from '../../interfaces/departamento.model';
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
  busqueda = '';
  filtroCargo = '';
  cargos: any[] = [];
  departamentos: Departamento[] = [];
  filtroDepartamento = '';
  ocultarInactivos: boolean = true;

  paginaActual = 1;
  tamanoPagina = 5;
  totalEmpleados = 0;

  esMovil = false;
  filaExpandidaId: number | null = null;
  alternarFila(colaborador: any) {
    this.filaExpandidaId =
      this.filaExpandidaId === colaborador.id ? null : colaborador.id;
  }
  ngOnInit(): void {
    this.detectarDispositivo();
    window.addEventListener('resize', () => this.detectarDispositivo());
    setTimeout(() => {
      this.cargarEmpleados();
      this.cargarCargos();
      this.cargarDepartamentos();
    }, 100);
  }
  detectarDispositivo() {
    this.esMovil = window.innerWidth <= 768;
  }
  confirmarDesvincular(colaborador: any) {
    this.colaboradores.forEach((c) => (c.confirmar = false));
    colaborador.confirmar = true;
  }

  desvincular(colaborador: any) {
    this.empleadoService.desvincularEmpleado(colaborador.id).subscribe({
      next: () => {
        colaborador.estado = 'inactivo'; // o recargar lista si prefieres
        colaborador.confirmar = false;
      },
      error: (err) => console.error('Error al desvincular:', err),
    });
  }
  cambiarEstado(colaborador: any) {
    this.empleadoService.cambiarEstadoEmpleado(colaborador.id).subscribe({
      next: () => {
        colaborador.estado =
          colaborador.estado === 'activo' ? 'inactivo' : 'activo';
        colaborador.confirmar = false;
      },
      error: (err) => console.error('Error al cambiar estado:', err),
    });
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
  cargarEmpleados(pagina: number = 1) {
    const params: any = {
      page: pagina,
      page_size: this.tamanoPagina,
    };
    if (this.filtroDepartamento) {
      params['cargo__departamento'] = this.filtroDepartamento;
    }
    if (this.ocultarInactivos) {
      params.estado = 'activo';
    }

    if (this.busqueda) params.search = this.busqueda;
    if (this.filtroCargo) params.cargo = this.filtroCargo;
    if (this.ocultarInactivos) {
      params.estado = 'activo';
    }

    this.empleadoService.getEmpleados(params).subscribe({
      next: (res) => {
        this.colaboradores = res.results;
        this.totalEmpleados = res.count;
        this.paginaActual = pagina;
      },
      error: (err) => console.error('Error al cargar empleados:', err),
    });
  }

  aplicarFiltros() {
    this.cargarEmpleados(); // Se vuelve a cargar con filtros aplicados
  }

  cargarCargos() {
    this.empleadoService.getCargos().subscribe({
      next: (data) => (this.cargos = data),
      error: (error) => console.error('Error al cargar cargos:', error),
    });
  }
  cargarDepartamentos() {
    this.empleadoService.getDepartamentos().subscribe({
      next: (data) => (this.departamentos = data),
      error: (err) => console.error('Error al cargar departamentos:', err),
    });
  }
  totalPaginasArray(): number[] {
    const totalPaginas = Math.ceil(this.totalEmpleados / this.tamanoPagina);
    return Array.from({ length: totalPaginas }, (_, i) => i + 1);
  }
}
