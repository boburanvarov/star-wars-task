import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss']
})
export class DashboardOverviewComponent implements OnInit {
  @HostBinding('class') class = 'col';
  cards: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.cards = [
      {
        title: 'Films', totalCount: 17, increaseCount: 1, imageUrl: 'assets/images/film.svg', backgroundColor: 'hsla(171, 97%, 42%, 0.2)'
      },
      {
        title: 'Starships', totalCount: 57, increaseCount: 5, imageUrl: 'assets/images/starship.svg', backgroundColor: 'hsla(219, 100%, 56%, 0.2)'
      },
      {
        title: 'People', totalCount: 14394, increaseCount: 429, imageUrl: 'assets/images/people.svg', backgroundColor: 'hsla(243, 49%, 38%, 0.2)'
      },
      {
        title: 'Vehicles', totalCount: 329, increaseCount: 17, imageUrl: 'assets/images/vehicle.svg', backgroundColor: 'hsla(52, 86%, 59%, 0.2)'
      },
      {
        title: 'Species', totalCount: 3058, increaseCount: 10, imageUrl: 'assets/images/species.svg', backgroundColor: 'hsla(245, 56%, 58%, 0.2)'
      },
    ];
  }

}
