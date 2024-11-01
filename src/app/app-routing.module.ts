import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmpleadosComponent } from './add-empleados/add-empleados.component';
import { AddPrendasComponent } from './add-prendas/add-prendas.component';
import { AddProveedoresComponent } from './add-proveedores/add-proveedores.component';
import { RealizarPedidosComponent } from './realizar-pedidos/realizar-pedidos.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  // Home por defecto
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
