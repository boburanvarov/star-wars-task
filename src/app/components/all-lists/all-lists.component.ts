import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-all-lists',
  templateUrl: './all-lists.component.html',
  styleUrls: ['./all-lists.component.scss']
})
export class AllListsComponent implements OnInit {

  @Input('entries') entries!: any[];
  @Input('heading') heading!: string;
  @Input('route') route!: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
