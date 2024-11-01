import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AddEmpleadosComponent } from './add-empleados/add-empleados.component';
import { AddPrendasComponent } from './add-prendas/add-prendas.component';
import { AddProveedoresComponent } from './add-proveedores/add-proveedores.component';
import { RealizarPedidosComponent } from './realizar-pedidos/realizar-pedidos.component';

const routes: Routes = [
  { path: '', component: LoginComponent },  // Muestra la pantalla de login al inicio
  { path: 'home', component: HomeComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'add-empleados', component: AddEmpleadosComponent },
  { path: 'add-prendas', component: AddPrendasComponent },
  { path: 'add-proveedores', component: AddProveedoresComponent },
  { path: 'realizar-pedidos', component: RealizarPedidosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
