import { Component } from '@angular/core';
import { Login } from './features/auth/components/login/login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}