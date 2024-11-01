import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-prendas',
  templateUrl: './add-prendas.component.html',
  styleUrls: ['./add-prendas.component.css']
})
export class AddPrendasComponent {
  title = 'Gestione su almacén';
  prenda = {
    nombre: '',
    talla: '',
    precio: null,
    color: '',
    descripcion: '',
    cantidad: null
  };

  prendas: any[] = []; 
  isModalOpen: boolean = false;
  modalAction: string = '';
  updateId: number = 0;
  deleteId: number = 0;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('http://localhost:3000/api/prendas', this.prenda)
      .subscribe({
        next: (response) => {
          console.log('Prenda añadida con éxito', response);
          this.router.navigate(['/prendas']);
        },
        error: (error) => {
          console.error('Error al añadir la prenda', error);
        }
      });
  }

  openModal(action: string) {
    this.modalAction = action;
    this.isModalOpen = true;

    if (action === 'get') {
      this.getPrendas();
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }

  getPrendas() {
    this.http.get('http://localhost:3000/api/prendas')
      .subscribe({
        next: (data: any) => {
          this.prendas = data;
        },
        error: (error) => {
          console.error('Error al obtener las prendas', error);
        }
      });
  }

  updatePrenda() {
    this.http.put(`http://localhost:3000/api/prendas/${this.updateId}`, this.prenda)
      .subscribe({
        next: (response) => {
          console.log('Prenda actualizada con éxito', response);
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al actualizar la prenda', error);
        }
      });
  }

  deletePrenda() {
    this.http.delete(`http://localhost:3000/api/prendas/${this.deleteId}`)
      .subscribe({
        next: (response) => {
          console.log('Prenda eliminada con éxito', response);
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al eliminar la prenda', error);
        }
      });
  }
}
