import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

//root module should be AppModule
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
