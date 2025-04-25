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
    ColaboradoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
