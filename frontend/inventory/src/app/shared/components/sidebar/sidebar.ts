import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';

import { Isidebar } from '../../models/isidebar';
import { AuthService } from '../../../core/services/auths.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar {

  user = {
    name: 'Ahmed Ali',
    role: 'Admin'
  };

  userMenuOpen = false;

  expanded = false;
  isMobile = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.checkScreen();

    const currentUser = this.authService.getStoredUser();

    if (currentUser) {
      this.user = {
        name: currentUser.name,
        role: currentUser.role
      };
    }
  }

  SaidItems: Isidebar[] = [
    {
      label: 'Dashboard',
      route: '/dashboard',
      icon: [
        'm3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
        'M9 22V12h6v10'
      ],
    },
    {
      label: 'Products',
      route: '/products',
      icon: [
        'M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z',
        'm3.3 7 8.7 5 8.7-5',
        'M12 22V12',
      ],
    },
    {
      label: 'Users',
      route: '/users',
      icon: [
        'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2',
        'M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
        'M22 21v-2a4 4 0 0 0-3-3.87',
      ],
    },
    {
      label: 'Suppliers',
      route: '/supplier',
      icon: [
        'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2',
        'M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
        'M22 21v-2a4 4 0 0 0-3-3.87',
        'M16 3.13a4 4 0 0 1 0 7.75',
      ],
    },
    {
      label: 'Orders',
      route: '/order',
      icon: [
        'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2',
        'M9 2h6v4H9z',
        'M9 12h6',
        'M9 16h4',
      ],
    },
    {
      label: 'Stock',
      route: '/stock',
      icon: [
        'M4 4h16v4H4z',
        'M6 8v11a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8',
        'M10 12h4',
      ],
    }
  ];

  logoutIcon: string[] = [
    'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4',
    'm16 17 5-5-5-5',
    'M21 12H9'
  ];

  @HostListener('window:resize')
  checkScreen(): void {

    this.isMobile = window.innerWidth <= 900;

    if (!this.isMobile) {
      this.expanded = true;
    }
  }

  toggleWidth(): void {
    this.expanded = !this.expanded;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {

    if (this.isMobile) {
      this.expanded = false;
    }
  }

  get userInitial(): string {
    return this.user.name.charAt(0).toUpperCase();
  }

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }

  logout(): void {

    this.authService.logout().subscribe({

      next: () => {
        this.router.navigate(['/login']);
      },

      error: () => {
        this.authService.clearSession();
        this.router.navigate(['/login']);
      }

    });

  }

}