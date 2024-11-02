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
  updateId: number | null = null;  // Permitir que updateId sea nulo

  constructor(private http: HttpClient, private router: Router) {
    this.getPedidosProveedor();  // Carga inicial de pedidos al inicializar el componente
  }

  onSubmit() {
    if (this.updateId) {
      // Si hay un ID de actualización, se actualiza el pedido
      this.http.put(`http://localhost:3000/api/pedidosProveedores/${this.updateId}`, this.pedidoProveedor)
        .subscribe({
          next: (response) => {
            console.log('Pedido a proveedor actualizado con éxito', response);
            this.getPedidosProveedor(); // Recarga la lista de pedidos
            this.resetForm(); // Reinicia el formulario
          },
          error: (error) => {
            console.error('Error al actualizar el pedido', error);
          }
        });
    } else {
      // Si no hay ID de actualización, se crea un nuevo pedido
      this.http.post('http://localhost:3000/api/pedidosProveedores', this.pedidoProveedor)
        .subscribe({
          next: (response) => {
            console.log('Pedido a proveedor añadido con éxito', response);
            this.getPedidosProveedor(); // Recarga la lista de pedidos
            this.resetForm(); // Reinicia el formulario
          },
          error: (error) => {
            console.error('Error al añadir el pedido', error);
          }
        });
    }
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

  setUpdateData(pedido: any) {
    // Establece los datos del pedido en el formulario para actualizar
    this.pedidoProveedor = { ...pedido };  // Copia el pedido seleccionado al formulario
    this.updateId = pedido.id_pedido_proveedor;  // Guarda el ID del pedido a actualizar
  }

  deletePedidoProveedor(id: number) {
    this.http.delete(`http://localhost:3000/api/pedidosProveedores/${id}`)
      .subscribe({
        next: (response) => {
          console.log('Pedido a proveedor eliminado con éxito', response);
          this.getPedidosProveedor(); // Recarga la lista de pedidos
        },
        error: (error) => {
          console.error('Error al eliminar el pedido', error);
        }
      });
  }

  resetForm() {
    // Reinicia el formulario
    this.pedidoProveedor = {
      id_empleado: null,
      id_proveedor: null,
      id_prenda: null,
      cantidad: null,
      precio_unitario: null,
      fecha_pedido: '',
      fecha_entrega: ''
    };
    this.updateId = null; // Resetea el ID de actualización
  }
}
