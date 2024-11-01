import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-empleados',
  templateUrl: './add-empleados.component.html',
  styleUrls: ['./add-empleados.component.css']
})
export class AddEmpleadosComponent implements OnInit {
  title = 'Gestione su almacén';

  empleado = {
    nombres: '',
    apellidos: '',
    direccion: '',
    telefono: '',
    salario: 0
  };

  empleados: any[] = [];
  isModalOpen = false;
  modalAction = '';
  updateId: number = 0;
  deleteId: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEmpleados();
  }

  onSubmit() {
    this.http.post('http://localhost:3000/api/empleados', this.empleado).subscribe(response => {
      alert('Empleado creado con éxito');
      this.getEmpleados();
    });
  }

  openModal(action: string) {
    this.modalAction = action;
    this.isModalOpen = true;
    if (action === 'get') {
      this.getEmpleados();
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.modalAction = '';
  }

  getEmpleados() {
    this.http.get<any[]>('http://localhost:3000/api/empleados').subscribe(response => {
      this.empleados = response;
    });
  }

  updateEmpleado() {
    this.http.put(`http://localhost:3000/api/empleados/${this.updateId}`, this.empleado).subscribe(response => {
      alert('Empleado actualizado con éxito');
      this.getEmpleados();
      this.closeModal();
    });
  }

  deleteEmpleado() {
    this.http.delete(`http://localhost:3000/api/empleados/${this.deleteId}`).subscribe(response => {
      alert('Empleado eliminado con éxito');
      this.getEmpleados();
      this.closeModal();
    });
  }
}
