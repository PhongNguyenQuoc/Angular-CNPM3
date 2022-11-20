import {domain as domain, clientId as clientId,audience as audience,serverUrl as serverUrl} from '../../auth_config.json';

export const environment = {
  production: false,
  auth : {
    "domain": "dev-6gg07cw4rqjhfyih.us.auth0.com",
    "clientId": "tBYgkeG3pCxmbO31NCNza75ksLfbFqlt",
    "audience": "localhost:9000/api",
    redirectUri: window.location.origin,
  },
  dev: {
    "serverUrl": "http://localhost:3000"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
import { AppComponent } from './../app/components/app/app.component';import { from } from 'rxjs';

