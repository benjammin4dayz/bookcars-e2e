import { PageModel } from '../../scripts';

export class LocationsPage extends PageModel {
  constructor(route) {
    super({ frontend: route });
  }

  get selectors() {
    return {
      map: '.map',
      zoomIn: '.leaflet-control-zoom-in',
      zoomOut: '.leaflet-control-zoom-out',
    };
  }
}
