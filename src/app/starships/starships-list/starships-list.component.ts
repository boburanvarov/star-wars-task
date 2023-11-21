import { Component, OnInit } from '@angular/core';
import { StarshipsService } from '../../shared/services/Starships/starships.service';
import { Observable } from 'rxjs';
import { Starship } from '../../shared/interfaces/Starship/starship';

@Component({
  selector: 'app-starships-list',
  templateUrl: './starships-list.component.html',
  styleUrls: ['./starships-list.component.scss']
})
export class StarshipsListComponent implements OnInit {

  starships$!: Observable<Starship[]>;

  get currentFilter(): string {
    return this.starshipsService.getCurrentFilter();
  }

  constructor(private starshipsService: StarshipsService) { }

  ngOnInit(): void {
    this.getStarships()
  }

  getStarships() {
    this.starships$ = this.starshipsService.starships$;
  }

  onInput(text: string): void {
    this.starshipsService.changeFilter(text);
  }
}
