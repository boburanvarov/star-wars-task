import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-link',
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.scss']
})
export class NavLinkComponent implements OnInit {
  @Input() link: { name: string; url: string, icon: string } = { name: '', url: '', icon: '' };

  constructor() { }

  ngOnInit(): void {
  }
}
