import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http'; // Importar withFetch
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddEmpleadosComponent } from './add-empleados/add-empleados.component';
import { AddPrendasComponent } from './add-prendas/add-prendas.component';
import { AddProveedoresComponent } from './add-proveedores/add-proveedores.component';
import { RealizarPedidosComponent } from './realizar-pedidos/realizar-pedidos.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { HistorialContratacionesComponent } from './historial-contrataciones/historial-contrataciones.component';
import { VentasComponent } from './ventas/ventas.component';
import { FacturasComponent } from './facturas/facturas.component';

@NgModule({
  declarations: [
    AppComponent,
    AddEmpleadosComponent,
    AddPrendasComponent,
    AddProveedoresComponent,
    RealizarPedidosComponent,
    HomeComponent,
    LoginComponent,
    RegisterUserComponent,
    HistorialContratacionesComponent,
    VentasComponent,
    FacturasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  
    HttpClientModule
  ],
  providers: [
    provideHttpClient(withFetch()), 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
