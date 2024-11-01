import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-proveedores',
  templateUrl: './add-proveedores.component.html',
  styleUrls: ['./add-proveedores.component.css']
})
export class AddProveedoresComponent {
  title = 'Gestione su almacén';

  proveedor = {
    nombres: '',        // Coincide con el modelo en el backend
    apellidos: '',      // Coincide con el modelo en el backend
    telefono: null,     // Debe ser número
    email: '',          // Coincide con el modelo en el backend
    direccion: ''       // Campo opcional
  };

  proveedores: any[] = [];  // Lista de proveedores obtenida de la API
  isModalOpen: boolean = false;
  modalAction: string = '';
  updateId: number = 0;
  deleteId: number = 0;

  constructor(private http: HttpClient, private router: Router) {}

  // Enviar el formulario para crear un proveedor
  onSubmit() {
    this.http.post('http://localhost:3000/api/proveedores', this.proveedor)
      .subscribe({
        next: (response) => {
          console.log('Proveedor añadido con éxito', response);
          this.router.navigate(['/proveedores']);  // Redirige a la lista de proveedores o refresca
        },
        error: (error) => {
          console.error('Error al añadir el proveedor', error);
        }
      });
  }

  // Abrir modal para las operaciones CRUD
  openModal(action: string) {
    this.modalAction = action;
    this.isModalOpen = true;

    if (action === 'get') {
      this.getProveedores();  // Consultar proveedores
    }
  }

  // Cerrar modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Obtener todos los proveedores (Consultar)
  getProveedores() {
    this.http.get('http://localhost:3000/api/proveedores')
      .subscribe({
        next: (data: any) => {
          this.proveedores = data;  // Asignar los proveedores al array
        },
        error: (error) => {
          console.error('Error al obtener los proveedores', error);
        }
      });
  }

  // Actualizar un proveedor
  updateProveedor() {
    this.http.put(`http://localhost:3000/api/proveedores/${this.updateId}`, this.proveedor)
      .subscribe({
        next: (response) => {
          console.log('Proveedor actualizado con éxito', response);
          this.closeModal();  // Cerrar el modal tras actualizar
        },
        error: (error) => {
          console.error('Error al actualizar el proveedor', error);
        }
      });
  }

  // Eliminar un proveedor
  deleteProveedor() {
    this.http.delete(`http://localhost:3000/api/proveedores/${this.deleteId}`)
      .subscribe({
        next: (response) => {
          console.log('Proveedor eliminado con éxito', response);
          this.closeModal();  // Cerrar el modal tras eliminar
        },
        error: (error) => {
          console.error('Error al eliminar el proveedor', error);
        }
      });
  }
}
