import { Routes } from '@angular/router';
import { PortalDeAccesoComponent } from './pages/portal-de-acceso/portal-de-acceso.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {path:'', component: PortalDeAccesoComponent},
    {path:'Dashboard', component: DashboardComponent},
];
