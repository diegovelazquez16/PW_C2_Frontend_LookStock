import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-historial-contrataciones',
  templateUrl: './historial-contrataciones.component.html',
  styleUrls: ['./historial-contrataciones.component.css']
})
export class HistorialContratacionesComponent implements OnInit {
  title = 'Historial de Contrataciones';

  historial = {
    id_historial: null,
    id_empleado: null,
    fechaCambio: '',
    salarioAnterior: null,
    nuevoSalario: null
  };

  historiales: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getHistorial();
  }

  onSubmit() {
    if (this.historial.id_historial) {
      this.updateHistorial();
    } else {
      this.createHistorial();
    }
  }

  createHistorial() {
    this.http.post('http://localhost:3000/api/historial', this.historial).subscribe(response => {
      alert('Historial creado con éxito');
      this.getHistorial();
      this.resetHistorialForm();
    }, error => {
      console.error('Error al crear historial:', error);
      alert('Error al crear el historial');
    });
  }

  getHistorial() {
    this.http.get<any[]>('http://localhost:3000/api/historial').subscribe(response => {
      this.historiales = response;
    }, error => {
      console.error('Error al obtener el historial:', error);
    });
  }

  editHistorial(hist: any) {
    this.historial = { ...hist };
  }

  updateHistorial() {
    this.http.put(`http://localhost:3000/api/historial/${this.historial.id_historial}`, this.historial).subscribe(response => {
      alert('Historial actualizado con éxito');
      this.getHistorial();
      this.resetHistorialForm();
    }, error => {
      console.error('Error al actualizar historial:', error);
      alert('Error al actualizar el historial');
    });
  }

  deleteHistorial(id: number) {
    this.http.delete(`http://localhost:3000/api/historial/${id}`).subscribe(response => {
      alert('Historial eliminado con éxito');
      this.getHistorial();
    }, error => {
      console.error('Error al eliminar historial:', error);
      alert('Error al eliminar el historial');
    });
  }

  resetHistorialForm() {
    this.historial = {
      id_historial: null,
      id_empleado: null,
      fechaCambio: '',
      salarioAnterior: null,
      nuevoSalario: null
    };
  }
}
