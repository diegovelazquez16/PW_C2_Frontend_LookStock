import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  nombres: string = '';
  apellidos: string = '';
  email: string = '';
  password: string = '';
  rol: string = 'empleado'; // Valor por defecto
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  onRegister() {
    this.http.post('/api/register', {
      nombres: this.nombres,
      apellidos: this.apellidos,
      email: this.email,
      pass: this.password,
      rol: this.rol
    }).subscribe(
      (response: any) => {
        this.successMessage = 'Usuario creado con éxito';
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Error al crear usuario';
        this.successMessage = '';
      }
    );
  }
}
