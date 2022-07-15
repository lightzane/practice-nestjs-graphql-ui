import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PrimeIcons, PrimeNGConfig } from 'primeng/api';
import { NavOption } from './shared/interfaces/nav-options.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  navOptions: NavOption[];
  selectedNav: NavOption;

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.initNavOptions();
    // this.initParticles();
  }

  private initNavOptions(): void {
    this.navOptions = [
      {
        name: 'Inventory',
        url: '/inventory',
        icon: PrimeIcons.BOX,
        imageUrl: 'https://www.primefaces.org/primeng/assets/showcase/images/dock/photos.svg'
      },
      {
        name: 'Recipes',
        url: '/recipes',
        icon: PrimeIcons.BOOK,
        imageUrl: 'https://www.primefaces.org/primeng/assets/showcase/images/dock/safari.svg'
      },
      {
        name: 'Gather',
        url: '/gather',
        icon: PrimeIcons.TWITTER,
        imageUrl: 'https://www.primefaces.org/primeng/assets/showcase/images/dock/appstore.svg'
      }
    ];
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        this.selectedNav = this.navOptions.find((opt => opt.url === evt.url)) || this.navOptions[0];
      }
    });

  }

  // private initParticles(): void {
  //   const script = document.createElement('script');
  //   script.src = 'https://cdn.jsdelivr.net/gh/lightzane/web-animation-api@master/script.js';
  //   document.body.append(script);
  // }

}
