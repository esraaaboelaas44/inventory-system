import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [CommonModule, Sidebar, RouterLink],
  templateUrl: './supplier.html',
  styleUrl: './supplier.css',
})
export class Supplier {}
