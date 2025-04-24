import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getDashboard().subscribe({
      next: (res) => console.log('Dashboard:', res),
      error: (err) => console.error('No autenticado:', err),
    });
  }
}
