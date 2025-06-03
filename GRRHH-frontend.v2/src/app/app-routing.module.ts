import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalDeAccesoComponent } from './pages/portal-de-acceso/portal-de-acceso.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PortalComponent } from './pages/portal/portal.component';
import { ColaboradoresComponent } from './pages/colaboradores/colaboradores.component';
import { LiquidacionesComponent } from './pages/liquidaciones/liquidaciones.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { ReclutamientoComponent } from './pages/reclutamiento/reclutamiento.component';
import { PrevisionComponent } from './pages/admin-laboral/prevision/prevision.component';
import { TiposContratoComponent } from './pages/admin-laboral/tipos-contrato/tipos-contrato.component';
import { CargasComponent } from './pages/admin-laboral/cargas/cargas.component';
import { GruposHorarioComponent } from './pages/admin-laboral/asistencia/grupos-horario/grupos-horario.component';
import { AsignarHorarioComponent } from './pages/admin-laboral/asistencia/asignar-horario/asignar-horario.component';
import { RegistrosComponent } from './pages/admin-laboral/asistencia/registros/registros.component';
import { EstructuraOrganizacionalComponent } from './pages/admin-laboral/estructura-organizacional/estructura-organizacional.component';

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
      { path: 'liquidaciones', component: LiquidacionesComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: 'reclutamiento', component: ReclutamientoComponent },
      { path: 'admin-laboral/prevision', component: PrevisionComponent },
      {
        path: 'admin-laboral/tipos-contrato',
        component: TiposContratoComponent,
      },
      { path: 'admin-laboral/cargas', component: CargasComponent },
      {
        path: 'admin-laboral/asistencia/grupos-horario',
        component: GruposHorarioComponent,
      },
      {
        path: 'admin-laboral/asistencia/asignar-horario',
        component: AsignarHorarioComponent,
      },
      {
        path: 'admin-laboral/asistencia/registros',
        component: RegistrosComponent,
      },

      {
        path: 'admin-laboral/estructura',
        component: EstructuraOrganizacionalComponent,
      },
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
