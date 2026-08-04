import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {

  // Which tab should be highlighted — set this from the parent page,
  // e.g. <app-sidebar activeTab="Products"></app-sidebar>
  @Input() activeTab: string = '';

  // Fires when a tab is clicked, so the parent page can navigate/react.
  // Not using routerLink yet since most of these pages don't exist as routes yet —
  // once they do, this can be swapped for [routerLink] instead.
  @Output() tabSelected = new EventEmitter<string>();

  @Output() logout = new EventEmitter<void>();

  tabs: string[] = ['Dashboard', 'Products', 'Suppliers', 'Orders', 'Stock Management'];

  selectTab(tab: string) {
    this.tabSelected.emit(tab);
  }

  onLogout() {
    this.logout.emit();
  }

}
