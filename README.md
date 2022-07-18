# practice-nestjs-graphql-ui

Create this UI for the https://github.com/lightzane/practice-nestjs-graphql using PrimeNG (https://www.primefaces.org/primeng/)

## Getting Started

See demo of this UI: https://lightzane.github.io/practice-nestjs-graphql-ui

- Must have this server setup: https://github.com/lightzane/practice-nestjs-graphql
- `npm install`
- `npm start`

## How this Project is Created

1. ng new practice-nestjs-graphql-ui
2. `npm install primeng primeicons`
3. Add the following in `angular.json`

```
node_modules/primeicons/primeicons.css
node_modules/primeng/resources/themes/lara-light-blue/theme.css
node_modules/primeng/resources/primeng.min.css
```

4. Add the following in `app.module.ts`

```ts
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
```

5. Select and inject primeng components (see more: https://www.primefaces.org/primeng/setup)
