import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

const ENVIRONMENT:String = 'development';
const IS_PRODUCTION = ENVIRONMENT == 'production';

if (IS_PRODUCTION) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
