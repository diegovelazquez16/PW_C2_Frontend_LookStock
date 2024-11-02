import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {
  title = 'Gestión de Facturas';
  facturas: any[] = [];

  factura = {
    id_factura: null,
    id_venta: null,
    fecha: new Date().toISOString().slice(0, 10),
    cliente: '',
    total: 0,
    estado: 'Pendiente'
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getFacturas();
  }

  getFacturas() {
    this.http.get<any[]>('http://localhost:3000/api/facturas').subscribe(response => {
      this.facturas = response;
    });
  }

  onSubmit() {
    if (this.factura.id_factura) {
      this.updateFactura();
    } else {
      this.createFactura();
    }
  }

  createFactura() {
    this.http.post('http://localhost:3000/api/facturas', this.factura).subscribe(response => {
      alert('Factura creada con éxito');
      this.getFacturas();
      this.resetFacturaForm();
    });
  }

  updateFactura() {
    this.http.put(`http://localhost:3000/api/facturas/${this.factura.id_factura}`, this.factura).subscribe(response => {
      alert('Factura actualizada con éxito');
      this.getFacturas();
      this.resetFacturaForm();
    });
  }

  editFactura(factura: any) {
    this.factura = { ...factura };
  }

  resetFacturaForm() {
    this.factura = {
      id_factura: null,
      id_venta: null,
      fecha: new Date().toISOString().slice(0, 10),
      cliente: '',
      total: 0,
      estado: 'Pendiente'
    };
  }
}
