import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalDeAccesoComponent } from './pages/portal-de-acceso/portal-de-acceso.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PortalComponent } from './pages/portal/portal.component';
import { ColaboradoresComponent } from './pages/colaboradores/colaboradores.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LayoutadminComponent } from './layoutadmin/layoutadmin/layoutadmin.component';

const routes: Routes = [
  { path: '', redirectTo: 'portal', pathMatch: 'full' },

  { path: 'portal', component: PortalComponent },
  { path: 'portal-de-acceso', component: PortalDeAccesoComponent },
  { path: 'inicio', component: InicioComponent },
  {
    path: '',
    component: LayoutadminComponent, // contiene header y sidebar
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'colaboradores', component: ColaboradoresComponent },
      // { path: 'nomina', component: NominaComponent },
      // { path: 'reportes', component: ReportesComponent },
    ],
  },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
