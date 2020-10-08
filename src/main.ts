import './polyfills';

import { enableProdMode } from '@angular/core';
declare var jasmine;
import jasmineRequire from 'jasmine-core/lib/jasmine-core/jasmine.js';
window['jasmineRequire'] = jasmineRequire;
import 'jasmine-core/lib/jasmine-core/jasmine-html.js';
import 'jasmine-core/lib/jasmine-core/boot.js';
import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import './test.ts'
import { AppModule } from './app/app.module';

platformBrowserDynamicTesting().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;

  // Otherise, log the boot error
}).catch(err => console.error(err));

(function bootstrap () {
    if (window['jasmineRef']) { 
    location.reload();
    return;
  } else {
    window.onload(undefined); // overwrited by jasmine, initialize env    
    window['jasmineRef'] = jasmine.getEnv();
  }
}());
