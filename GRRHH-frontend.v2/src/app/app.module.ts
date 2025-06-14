import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PortalDeAccesoComponent } from './pages/portal-de-acceso/portal-de-acceso.component';
import { PortalComponent } from './pages/portal/portal.component';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './pages/inicio/inicio.component';
import { HeaderComponent } from './layoutadmin/header/header.component';
import { SidebarComponent } from './layoutadmin/sidebar/sidebar.component';
import { LayoutadminComponent } from './layoutadmin/layoutadmin/layoutadmin.component';
import { ColaboradoresComponent } from './pages/colaboradores/colaboradores.component';
import { EmpleadoFormularioComponent } from './formularios/empleado-formulario/empleado-formulario.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { TokenRefreshInterceptor } from './auth/token-refresh.interceptor';
import { LiquidacionesComponent } from './pages/liquidaciones/liquidaciones.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { PostulanteFormularioComponent } from './formularios/postulante-formulario/postulante-formulario.component';
import { ReclutamientoComponent } from './pages/reclutamiento/reclutamiento.component';
import { PostulanteListadoComponent } from './pages/reclutamiento/postulante-listado/postulante-listado.component';
import { CommonModule } from '@angular/common';
import { PostulanteContratarComponent } from './formularios/postulante-contratar/postulante-contratar.component';
import { PrevisionComponent } from './pages/admin-laboral/prevision/prevision.component';
import { TiposContratoComponent } from './pages/admin-laboral/tipos-contrato/tipos-contrato.component';
import { CargasComponent } from './pages/admin-laboral/cargas/cargas.component';
import { EstructuraOrganizacionalComponent } from './pages/admin-laboral/estructura-organizacional/estructura-organizacional.component';
import { GruposHorarioComponent } from './pages/admin-laboral/asistencia/grupos-horario/grupos-horario.component';
import { AsignarHorarioComponent } from './pages/admin-laboral/asistencia/asignar-horario/asignar-horario.component';
import { RegistrosComponent } from './pages/admin-laboral/asistencia/registros/registros.component';
import { EditarHorarioComponent } from './modals/editar-horario/editar-horario.component';
import { ModalAsignarHorarioComponent } from './modals/modal-asignar-horario/modal-asignar-horario.component';
import { CuentaComponent } from './pages/ajustes/cuenta/cuenta.component';
import { SeguridadComponent } from './pages/ajustes/seguridad/seguridad.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PortalDeAccesoComponent,
    PortalComponent,
    InicioComponent,
    HeaderComponent,
    SidebarComponent,
    LayoutadminComponent,
    ColaboradoresComponent,
    EmpleadoFormularioComponent,
    LiquidacionesComponent,
    ReportesComponent,
    PostulanteFormularioComponent,
    ReclutamientoComponent,
    PostulanteListadoComponent,
    PostulanteContratarComponent,
    PrevisionComponent,
    TiposContratoComponent,
    CargasComponent,
    EstructuraOrganizacionalComponent,
    GruposHorarioComponent,
    AsignarHorarioComponent,
    RegistrosComponent,
    EditarHorarioComponent,
    ModalAsignarHorarioComponent,
    CuentaComponent,
    SeguridadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenRefreshInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
