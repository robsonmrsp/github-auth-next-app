const isNotBrowser = typeof window === 'undefined' || typeof document === 'undefined';

const initialize = () => {
  if (isNotBrowser) return;

  const core = document.createElement('script');
  core.src = 'https://js.api.here.com/v3/3.1/mapsjs-core.js';

  core.async = 1;
  document.head.insertBefore(core, document.head.childNodes[0]);

  const service = document.createElement('script');
  service.src = 'https://js.api.here.com/v3/3.1/mapsjs-service.js';

  service.async = 1;
  document.head.insertBefore(service, document.head.childNodes[1]);
};
export const HereMap = { initialize };
