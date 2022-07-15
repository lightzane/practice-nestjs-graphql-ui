import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  $time: Observable<Date> = interval(1000).pipe(map(() => new Date()));

  menuItems = [
    {
      label: 'Finder',
      className: 'menubar-root'
    },
    {
      label: 'File'
    },
    {
      label: 'Edit'
    },
    {
      label: 'View'
    },
    {
      label: 'Go'
    },
    {
      label: 'Window'
    },
    {
      label: 'Help'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
