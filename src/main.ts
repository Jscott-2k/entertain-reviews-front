import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from '../environments/environment';

async function prepareApp() {
  try {
    if (window && !environment.production) {
      const { mockWorker: worker } = await import('./mocks/browser');
      return worker.start();
    }
  } catch (error) {
    console.error('Error loading mock service worker:', error);
  }
  return Promise.resolve();
}
prepareApp().then(() => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
});
