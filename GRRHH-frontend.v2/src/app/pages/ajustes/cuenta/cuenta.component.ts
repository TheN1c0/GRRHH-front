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
    const payload: any = {
      first_name: this.cuenta.nombre,
      last_name: this.cuenta.apellido,
      email: this.cuenta.email,
      telefono: this.cuenta.telefono,
      username: this.cuenta.username,
    };

    if (
      this.cuenta.email !== this.cuenta.nuevo_email &&
      !this.cuenta.email_verificado
    ) {
      payload.nuevo_email = this.cuenta.email;
    }

    if (
      this.cuenta.telefono !== this.cuenta.nuevo_telefono &&
      !this.cuenta.telefono_verificado
    ) {
      payload.nuevo_telefono = this.cuenta.telefono;
    }

    this.cuentaService.actualizarDatos(payload).subscribe((res) => {
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

  smsEnviado = false;
  codigoSMS = '';

  reenviarVerificacionTelefono(): void {
    this.cuentaService.verificarTelefono().subscribe({
      next: () => {
        this.smsEnviado = true;
        alert('Código SMS enviado. Revisa tu teléfono.');
      },
      error: () => alert('Error al enviar el SMS'),
    });
  }

  verificarCodigoSMS(): void {
    if (!this.codigoSMS.trim()) {
      alert('Por favor, ingresa el código SMS.');
      return;
    }

    this.cuentaService.confirmarTelefono(this.codigoSMS).subscribe({
      next: () => {
        this.cuenta.telefono_verificado = true;
        this.smsEnviado = false;
        this.codigoSMS = '';
        alert('Teléfono verificado correctamente.');
      },
      error: () => {
        alert('❌ Código inválido o expirado.');
      },
    });
  }
}
