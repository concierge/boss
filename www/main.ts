import {enableProdMode} from '@angular/core';
enableProdMode();

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module.js';

platformBrowserDynamic().bootstrapModule(AppModule);
