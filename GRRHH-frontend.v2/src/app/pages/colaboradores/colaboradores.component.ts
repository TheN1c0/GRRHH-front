import { Component } from '@angular/core';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrl: './colaboradores.component.scss',
})
export class ColaboradoresComponent {
  colaboradores = [
    {
      foto: 'https://via.placeholder.com/40',
      nombre: 'Ana Pérez',
      cargo: 'Diseñadora UX',
      area: 'Diseño',
      estado: 'activo',
      confirmar: false,
    },
    {
      foto: 'https://via.placeholder.com/40',
      nombre: 'Carlos Rodríguez',
      cargo: 'Backend Developer',
      area: 'TI',
      estado: 'inactivo',
      confirmar: false,
    },
  ];

  confirmarDesvincular(colaborador: any) {
    this.colaboradores.forEach((c) => (c.confirmar = false)); // cerrar otras confirmaciones
    colaborador.confirmar = true;
  }

  desvincular(colaborador: any) {
    console.log('Desvinculando a:', colaborador.nombre);
    colaborador.confirmar = false;
    // lógica para desvincular
  }

  toggleConfirm(colaborador: any) {
    this.colaboradores.forEach((c) => {
      if (c !== colaborador) c.confirmar = false;
    });
    colaborador.confirmar = !colaborador.confirmar;
  }
}
