import { Component }          from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'boss-app',
  template: `
    <nav class="navbar navbar-inverse navbar-static-top">
        <div class="container-fluid" style="width:100%;height:100%">
                <a class="navbar-brand" style="height:100%;color:#9d9d9d;padding-top:0.7rem">
                    <span class="glyphicon glyphicon-console"></span>
                    {{title}}
                </a>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                        <a routerLink="/dashboard">Dashboard</a>
                    </li>
                    <li routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                        <a routerLink="/heroes">Heroes</a>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a href="https://github.com/concierge/boss/issues">
                            <span class="glyphicon glyphicon-wrench"></span>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/concierge/Concierge">
                            <span class="glyphicon glyphicon-info-sign"></span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container">
        <router-outlet></router-outlet>
    </div>
  `
})

export class AppComponent {
    title = 'Boss';
}
