// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const baseUrl = '//192.168.0.20:8000';

export const environment = {
  production: false,

  baseDomain: '//localhost:8000/',
  baseApiUrl: `${baseUrl}/api`,
  auth: {
    redirect: {
      login: '/tabs',
      logout: '/signin',
      signup: '/signin'
    }
  },
  GOOGLE_MAPS_API: 'AIzaSyCVi55kxDIsbz303Vaic_TAyGGCbEoDlJ4',
  GOOGLE_MAPS_API_ACTIVE: true,
  GEOCODER_API_ACTIVE: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
