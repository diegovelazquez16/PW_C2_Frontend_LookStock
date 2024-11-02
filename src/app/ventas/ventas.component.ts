import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  ventas: any[] = [];
  venta = {
    id_venta: null,
    id_prenda: null,
    cantidad: 0,
    estado: 'Pendiente',
    fechaVenta: new Date().toISOString().slice(0, 10)
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getVentas();
  }

  getVentas() {
    this.http.get<any[]>('http://localhost:3000/api/ventas').subscribe(response => {
      this.ventas = response;
    });
  }

  onSubmit() {
    if (this.venta.id_venta) {
      this.updateEstadoVenta();
    } else {
      this.createVenta();
    }
  }

  createVenta() {
    this.http.post('http://localhost:3000/api/ventas', this.venta).subscribe(response => {
      alert('Venta creada con éxito');
      this.getVentas();
      this.resetVentaForm();
    });
  }

  updateEstadoVenta() {
    this.http.put(`http://localhost:3000/api/ventas/${this.venta.id_venta}`, { estado: this.venta.estado }).subscribe(response => {
      alert('Estado de venta actualizado con éxito');
      this.getVentas();
      this.resetVentaForm();
    });
  }

  editVenta(v: any) {
    this.venta = { ...v };
  }



  resetVentaForm() {
    this.venta = {
      id_venta: null,
      id_prenda: null,
      cantidad: 0,
      estado: 'Pendiente',
      fechaVenta: new Date().toISOString().slice(0, 10)
    };
  }
}
