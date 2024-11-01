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
    id_empleado: null,
    nombres: '',
    apellidos: '',
    direccion: '',
    telefono: '',
    salario: 0,
    fechaContratacion: new Date().toISOString().slice(0, 10),
    estado: 'En nomina'
  };

  empleados: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEmpleados();
  }

  onSubmit() {
    if (this.empleado.id_empleado) {
      this.updateEmpleado();
    } else {
      this.createEmpleado();
    }
  }

  createEmpleado() {
    this.http.post('http://localhost:3000/api/empleados', this.empleado).subscribe(response => {
      alert('Empleado creado con éxito');
      this.getEmpleados();
      this.resetEmpleadoForm();
    });
  }

  getEmpleados() {
    this.http.get<any[]>('http://localhost:3000/api/empleados').subscribe(response => {
      this.empleados = response;
    });
  }

  editEmpleado(emp: any) {
    this.empleado = { ...emp };
  }

  updateEmpleado() {
    this.http.put(`http://localhost:3000/api/empleados/${this.empleado.id_empleado}`, this.empleado).subscribe(response => {
      alert('Empleado actualizado con éxito');
      this.getEmpleados();
      this.resetEmpleadoForm();
    });
  }

  deleteEmpleado(id: number) {
    this.http.delete(`http://localhost:3000/api/empleados/${id}`).subscribe(response => {
      alert('Empleado eliminado con éxito');
      this.getEmpleados();
    });
  }

  resetEmpleadoForm() {
    this.empleado = {
      id_empleado: null,
      nombres: '',
      apellidos: '',
      direccion: '',
      telefono: '',
      salario: 0,
      fechaContratacion: new Date().toISOString().slice(0, 10),
      estado: 'En nomina'
    };
  }
}
