import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-prendas',
  templateUrl: './add-prendas.component.html',
  styleUrls: ['./add-prendas.component.css']
})
export class AddPrendasComponent implements OnInit {
  title = 'Gestione su almacén';

  prenda = {
    id_prenda: null,
    nombre: '',
    talla: '',
    precio: 0,
    color: '',
    descripcion: '',
    cantidad: 0
  };

  prendas: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getPrendas();
  }

  onSubmit() {
    if (this.prenda.id_prenda) {
      this.updatePrenda();
    } else {
      this.createPrenda();
    }
  }

  createPrenda() {
    this.http.post('http://localhost:3000/api/prendas', this.prenda).subscribe(response => {
      alert('Prenda creada con éxito');
      this.getPrendas();
      this.resetPrendaForm();
    });
  }

  getPrendas() {
    this.http.get<any[]>('http://localhost:3000/api/prendas').subscribe(response => {
      this.prendas = response;
    });
  }

  editPrenda(p: any) {
    this.prenda = { ...p };
  }

  updatePrenda() {
    this.http.put(`http://localhost:3000/api/prendas/${this.prenda.id_prenda}`, this.prenda).subscribe(response => {
      alert('Prenda actualizada con éxito');
      this.getPrendas();
      this.resetPrendaForm();
    });
  }

  deletePrenda(id: number) {
    this.http.delete(`http://localhost:3000/api/prendas/${id}`).subscribe(response => {
      alert('Prenda eliminada con éxito');
      this.getPrendas();
    });
  }

  resetPrendaForm() {
    this.prenda = {
      id_prenda: null,
      nombre: '',
      talla: '',
      precio: 0,
      color: '',
      descripcion: '',
      cantidad: 0
    };
  }
}
