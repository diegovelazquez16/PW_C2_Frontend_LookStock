import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AddEmpleadosComponent } from './add-empleados/add-empleados.component';
import { AddPrendasComponent } from './add-prendas/add-prendas.component';
import { AddProveedoresComponent } from './add-proveedores/add-proveedores.component';
import { RealizarPedidosComponent } from './realizar-pedidos/realizar-pedidos.component';
import { HistorialContratacionesComponent } from './historial-contrataciones/historial-contrataciones.component';
import { VentasComponent } from './ventas/ventas.component';
const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'home', component: HomeComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'add-empleados', component: AddEmpleadosComponent },
  { path: 'add-prendas', component: AddPrendasComponent },
  { path: 'add-proveedores', component: AddProveedoresComponent },
  { path: 'realizar-pedidos', component: RealizarPedidosComponent },
  { path: 'historial-contrataciones', component: HistorialContratacionesComponent },
  { path: 'ventas', component: VentasComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
