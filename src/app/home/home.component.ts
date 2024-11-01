import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Gestione su almacén';

  constructor(private router: Router) {}

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
