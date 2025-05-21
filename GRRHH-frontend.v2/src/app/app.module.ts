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
import { PostulanteContratarComponent } from './pages/reclutamiento/postulante-contratar/postulante-contratar.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
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
