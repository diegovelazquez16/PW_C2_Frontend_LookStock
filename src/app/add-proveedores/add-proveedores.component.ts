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
    nombres: '',
    apellidos: '',
    telefono: null,
    email: '',
    direccion: ''
  };

  proveedores: any[] = [];
  editMode: boolean = false;
  editId: number = 0;

  constructor(private http: HttpClient, private router: Router) {
    this.getProveedores(); 
  }

  onSubmit() {
    if (this.editMode) {
      this.updateProveedor();
    } else {
      this.http.post('http://localhost:3000/api/proveedores', this.proveedor)
        .subscribe({
          next: (response) => {
            console.log('Proveedor añadido con éxito', response);
            this.getProveedores();
            this.resetForm(); 
          },
          error: (error) => {
            console.error('Error al añadir el proveedor', error);
          }
        });
    }
  }

  getProveedores() {
    this.http.get('http://localhost:3000/api/proveedores')
      .subscribe({
        next: (data: any) => {
          this.proveedores = data;  
        },
        error: (error) => {
          console.error('Error al obtener los proveedores', error);
        }
      });
  }

  editProveedor(id: number) {
    const proveedorToEdit = this.proveedores.find(prov => prov.id_proveedor === id);
    if (proveedorToEdit) {
      this.proveedor = { ...proveedorToEdit };
      this.editMode = true;
      this.editId = id;
    }
  }

  updateProveedor() {
    this.http.put(`http://localhost:3000/api/proveedores/${this.editId}`, this.proveedor)
      .subscribe({
        next: (response) => {
          console.log('Proveedor actualizado con éxito', response);
          this.getProveedores(); 
          this.resetForm(); 
          this.editMode = false; 
        },
        error: (error) => {
          console.error('Error al actualizar el proveedor', error);
        }
      });
  }

  deleteProveedor(id: number) {
    this.http.delete(`http://localhost:3000/api/proveedores/${id}`)
      .subscribe({
        next: (response) => {
          console.log('Proveedor eliminado con éxito', response);
          this.getProveedores(); 
        },
        error: (error) => {
          console.error('Error al eliminar el proveedor', error);
        }
      });
  }

  resetForm() {
    this.proveedor = {
      nombres: '',
      apellidos: '',
      telefono: null,
      email: '',
      direccion: ''
    };
    this.editMode = false; 
    this.editId = 0; 
  }
}
