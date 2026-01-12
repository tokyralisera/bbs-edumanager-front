import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

// PrimeNG Imports
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarModule,
    ButtonModule,
    AvatarModule,
    MenuModule,
    RippleModule,
    TooltipModule,
  ],
  templateUrl: 'dashboard-layout.component.html',
  styleUrls: ['dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit {
  currentUser: User | null = null;
  sidebarVisible: boolean = true;

  menuItems: MenuItem[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Récupérer l'utilisateur connecté
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });

    // Initialiser le menu
    this.initializeMenu();
  }

  initializeMenu(): void {
    this.menuItems = [
      {
        label: 'Tableau de bord',
        icon: 'pi pi-home',
        routerLink: ['/dashboard'],
        command: () => this.navigateTo('/dashboard'),
      },
      {
        label: 'Étudiants',
        icon: 'pi pi-users',
        routerLink: ['/students'],
        command: () => this.navigateTo('/students'),
      },
      {
        label: 'Utilisateurs',
        icon: 'pi pi-user',
        routerLink: ['/users'],
        command: () => this.navigateTo('/users'),
        visible: this.currentUser?.role === 'ADMIN',
      },
      {
        separator: true,
      },
      {
        label: 'Paramètres',
        icon: 'pi pi-cog',
        routerLink: ['/settings'],
        command: () => this.navigateTo('/settings'),
      },
    ];
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }

  logout(): void {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      this.authService.logout();
    }
  }

  getInitials(): string {
    if (!this.currentUser) return 'U';
    const first = this.currentUser.first_name?.charAt(0) || '';
    const last = this.currentUser.last_name?.charAt(0) || '';
    return (first + last).toUpperCase();
  }

  getRoleBadge(): string {
    return this.currentUser?.role === 'ADMIN' ? 'Administrateur' : 'Scolarité';
  }
}
