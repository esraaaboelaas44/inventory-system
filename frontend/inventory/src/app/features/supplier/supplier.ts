import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Sidebar } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [CommonModule, Sidebar],
  templateUrl: './supplier.html',
  styleUrl: './supplier.css',
})
export class Supplier {}
