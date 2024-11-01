import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddEmpleadosComponent } from './add-empleados/add-empleados.component';
import { AddPrendasComponent } from './add-prendas/add-prendas.component';
import { AddProveedoresComponent } from './add-proveedores/add-proveedores.component';
import { RealizarPedidosComponent } from './realizar-pedidos/realizar-pedidos.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AddEmpleadosComponent,
    AddPrendasComponent,
    AddProveedoresComponent,
    RealizarPedidosComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  
    HttpClientModule 
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
