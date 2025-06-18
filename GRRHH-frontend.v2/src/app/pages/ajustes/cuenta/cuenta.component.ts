import { Component } from '@angular/core';
import { MicuentaService } from '../../../services/micuenta.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.scss',
})
export class CuentaComponent {
  cuenta = {
    nombre: '',
    apellido: '',
    email: '',
    username: '',
    telefono: '',
    email_verificado: false,
    nuevo_email: '',
    telefono_verificado: false,
    nuevo_telefono: '',
  };

  constructor(private cuentaService: MicuentaService) {}

  ngOnInit(): void {
    this.cuentaService.obtenerDatos().subscribe((datos) => {
      this.cuenta = datos;
    });
  }

  guardarCambios(): void {
    this.cuentaService.actualizarDatos(this.cuenta).subscribe((res) => {
      this.cuenta = res;
      alert('Cambios guardados correctamente.');

      if (res.nuevo_email) {
        alert('Se ha enviado un correo de verificación al nuevo email.');
      }

      if (res.nuevo_telefono) {
        alert('Se ha enviado un código SMS para verificar el nuevo número.');
      }
    });
  }

  reenviarVerificacionCorreo(): void {
    this.cuentaService.verificarCorreo().subscribe(() => {
      alert('Correo de verificación reenviado.');
    });
  }

  reenviarVerificacionTelefono(): void {
    this.cuentaService.verificarTelefono().subscribe(() => {
      alert('Mensaje SMS reenviado.');
    });
  }
}
