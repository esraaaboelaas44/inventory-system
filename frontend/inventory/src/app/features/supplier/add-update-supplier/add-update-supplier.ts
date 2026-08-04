import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Sidebar } from '../../../shared/components/sidebar/sidebar';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-update-supplier',
  standalone: true,
  imports: [CommonModule, Sidebar],
  templateUrl: './add-update-supplier.html',
  styleUrls: ['./add-update-supplier.css'],
})
export class AddUpdateSupplier {}
