import { Component, OnInit } from '@angular/core';
import { EmpleadoService, Empleado } from '../../services/empleado.service';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.scss'],
})
export class ColaboradoresComponent implements OnInit {
  colaboradores: any[] = [];

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe({
      next: (data) => {
        // Adaptamos los datos a tu tabla
        this.colaboradores = data.map((empleado) => ({
          foto: 'https://via.placeholder.com/40', // foto temporal
          nombre: empleado.nombre_usuario,
          cargo: empleado.nombre_cargo,
          area: empleado.nombre_departamento,
          estado: 'activo', // Por ahora todos activos. Luego puedes mapear de verdad.
          confirmar: false,
        }));
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
}
