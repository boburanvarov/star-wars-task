import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Pages} from '../../shared/enums/pages';
import {PAGINATION} from '../../shared/enums/pagination.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  logoUrl = 'assets/images/logo.png';
  userImageUrl = 'assets/images/user.png';
  navLinks = [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'tachometer-alt'
    },
    {
      name: 'Characters',
      url: `/${Pages.DASHBOARD}/${Pages.CHARACTERS}`,
      icon: 'user-astronaut'
    },
    {
      name: 'Films',
      url: `/${Pages.DASHBOARD}/${Pages.FILMS}`,
      icon: 'video'
    },
    {
      name: 'Planets',
      url: `/${Pages.DASHBOARD}/${Pages.PLANETS}`,
      icon: 'globe'
    },
    {
      name: 'Species',
      url: `/${Pages.DASHBOARD}/${Pages.SPECIES}`,
      icon: 'dragon'
    },
    {
      name: 'Starships',
      url: `/${Pages.DASHBOARD}/${Pages.STARSHIPS}`,
      icon: 'rocket'
    },
    {
      name: 'Vehicles',
      url: `/${Pages.DASHBOARD}/${Pages.VEHICLES}`,
      icon: 'truck-monster'
    },
  ];

  currentViewPlaceholder: any = '';
  showPagination = false;
  showYearDropdown = false;
  totalCount = 0;
  currentStart = 0;
  currentEnd = 0;
  data: any[] = [];
  searchTerm = '';

  constructor(
    private readonly router: Router, ) {
  }

  ngOnInit(): void {

  }

  toggleYearDropdown(): void {
    this.showYearDropdown = !this.showYearDropdown;
  }

  navigateToDashboard(): void {
    this.router.navigate(['dashboard']);
  }




  getCurrentViewPlaceholder(): void {
    this.currentViewPlaceholder = this.router.url.split('/').pop();
  }

  logout(): void {
    this.router.navigate(['']);
  }
}
