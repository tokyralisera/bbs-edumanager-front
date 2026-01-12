import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  template: `
    <div class="dashboard-container p-5">
      <div class="max-w-4xl mx-auto">
        <p-card>
          <ng-template pTemplate="header">
            <div class="p-4 bg-gradient-to-r from-pink-500 to-purple-500">
              <h1 class="text-3xl font-bold text-white m-0">
                Tableau de bord
              </h1>
            </div>
          </ng-template>
          
          <div class="p-4">
            <div *ngIf="currentUser" class="mb-4">
              <h2 class="text-2xl font-semibold mb-3">
                Bienvenue, {{ currentUser.first_name }} {{ currentUser.last_name }} !
              </h2>
              <div class="grid grid-nogutter gap-3">
                <div class="col-12 md:col-6">
                  <p><strong>Email:</strong> {{ currentUser.email }}</p>
                </div>
                <div class="col-12 md:col-6">
                  <p><strong>Rôle:</strong> 
                    <span class="px-2 py-1 rounded bg-pink-100 text-pink-800">
                      {{ currentUser.role }}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div class="border-top-1 border-gray-300 pt-4 mt-4">
              <p class="text-gray-600 mb-3">
                Vous êtes maintenant connecté au système BBS EduManager.
              </p>
              <p-button 
                label="Se déconnecter" 
                icon="pi pi-sign-out"
                severity="danger"
                (onClick)="logout()">
              </p-button>
            </div>
          </div>
        </p-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #fce7f3 0%, #f3e8ff 100%);
    }

    ::ng-deep {
      .p-card {
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        border-radius: 1rem;
        overflow: hidden;
      }

      .p-card-header {
        padding: 0;
      }

      .p-button {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        border: none;

        &:hover {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
        }
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}