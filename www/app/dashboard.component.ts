import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  modules: Object[] = [{
    name: 'Ping',
    version: 1.0,
    loader: 'Kassy',
    type: 'Module'
  },
  {
    name: 'Uptime',
    version: 1.0,
    loader: 'Kassy',
    type: 'Module'
  },
  {
    name: '8ball',
    version: 1.0,
    loader: 'Kassy',
    type: 'Module'
  },
  {
    name: 'anim',
    version: 1.0,
    loader: 'Kassy',
    type: 'Module'
  },
  {
    name: 'gif',
    version: 1.0,
    loader: 'Kassy',
    type: 'Module'
  },
  {
    name: 'creator',
    version: 1.0,
    loader: 'Kassy',
    type: 'Module'
  }];

  constructor() { }

  ngOnInit(): void {
  }
}
