import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PrimeIcons, PrimeNGConfig } from 'primeng/api';
import { interval } from 'rxjs';
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
  bg = [
    'bg-monterey-purple',
    'bg-mountain',
    'bg-boat'
  ];
  bgIdx = 0;

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.initNavOptions();
    // this.initParticles();
    interval(1000 * 15).subscribe(() => {
      this.bgIdx++;
      this.bgIdx = this.bgIdx > this.bg.length ? 0 : this.bgIdx;
      document.body.className = '';
      // document.body.classList.add(this.bg[Math.floor(Math.random() * this.bg.length)]);
      document.body.classList.add(this.bg[this.bgIdx]);
    });
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
