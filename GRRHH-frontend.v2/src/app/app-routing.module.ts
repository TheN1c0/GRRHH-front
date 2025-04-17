import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalDeAccesoComponent } from './pages/portal-de-acceso/portal-de-acceso.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PortalComponent } from './pages/portal/portal.component';

const routes: Routes = [
  { path: '', redirectTo: 'portal', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'portal', component: PortalComponent },
  { path: 'portal-de-acceso', component: PortalDeAccesoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
