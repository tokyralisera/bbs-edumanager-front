import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

// PrimeNG Imports
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, CardModule, ChartModule, ButtonModule],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent implements OnInit {
  currentUser: User | null = null;

  //? Statistiques (données factices pour le moment)
  stats = {
    totalStudents: 0,
    activeStudents: 0,
    totalUsers: 0,
    newEnrollments: 0,
  };

  chartData: any;
  chartOptions: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });

    //? Initialiser les données du graphique
    this.initializeChart();

    //? Simuler le chargement des stats (à remplacer par de vraies données)
    this.loadStats();
  }

  loadStats(): void {
    // TODO: Remplacer par de vraies données depuis l'API
    this.stats = {
      totalStudents: 245,
      activeStudents: 238,
      totalUsers: 12,
      newEnrollments: 23,
    };
  }

  initializeChart(): void {
    this.chartData = {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
      datasets: [
        {
          label: 'Inscriptions',
          data: [12, 19, 15, 25, 22, 30],
          backgroundColor: 'rgba(236, 72, 153, 0.2)',
          borderColor: '#ec4899',
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 5,
          },
        },
      },
    };
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  }
}
