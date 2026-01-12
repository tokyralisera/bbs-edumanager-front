import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, CardModule],
  template: `
    <div class="page-container">
      <h1 class="page-title">Paramètres</h1>
      <p-card>
        <div style="text-align: center; padding: 3rem;">
          <i class="pi pi-cog" style="font-size: 3rem; color: #9ca3af;"></i>
          <p style="margin-top: 1rem; color: #6b7280;">
            Module en cours de développement
          </p>
        </div>
      </p-card>
    </div>
  `,
  styles: [
    `
      .page-container {
        max-width: 1400px;
        margin: 0 auto;
      }
      .page-title {
        font-size: 2rem;
        font-weight: 700;
        color: #1f2937;
        margin: 0 0 2rem 0;
      }
    `,
  ],
})
export class SettingsComponent {}
