import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-realizar-pedidos',
  templateUrl: './realizar-pedidos.component.html',
  styleUrls: ['./realizar-pedidos.component.css']
})
export class RealizarPedidosComponent {
  title = 'Gestione su almacén';

  pedidoProveedor = {
    id_empleado: null,
    id_proveedor: null,
    id_prenda: null,
    cantidad: null,
    precio_unitario: null,
    fecha_pedido: '',
    fecha_entrega: ''
  };

  pedidosProveedor: any[] = [];
  isModalOpen: boolean = false;
  modalAction: string = '';
  updateId: number = 0;
  deleteId: number = 0;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('http://localhost:3000/api/pedidosProveedores', this.pedidoProveedor)
      .subscribe({
        next: (response) => {
          console.log('Pedido a proveedor añadido con éxito', response);
          this.router.navigate(['/pedidos']);
        },
        error: (error) => {
          console.error('Error al añadir el pedido', error);
        }
      });
  }

  openModal(action: string) {
    this.modalAction = action;
    this.isModalOpen = true;

    if (action === 'get') {
      this.getPedidosProveedor();
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }

  getPedidosProveedor() {
    this.http.get('http://localhost:3000/api/pedidosProveedores')
      .subscribe({
        next: (data: any) => {
          this.pedidosProveedor = data;
        },
        error: (error) => {
          console.error('Error al obtener los pedidos', error);
        }
      });
  }

  updatePedidoProveedor() {
    this.http.put(`http://localhost:3000/api/pedidosProveedores/${this.updateId}`, this.pedidoProveedor)
      .subscribe({
        next: (response) => {
          console.log('Pedido a proveedor actualizado con éxito', response);
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al actualizar el pedido', error);
        }
      });
  }

  deletePedidoProveedor() {
    this.http.delete(`http://localhost:3000/api/pedidosProveedores/${this.deleteId}`)
      .subscribe({
        next: (response) => {
          console.log('Pedido a proveedor eliminado con éxito', response);
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al eliminar el pedido', error);
        }
      });
  }
}
