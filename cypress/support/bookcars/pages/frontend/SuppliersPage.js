import { PageModel } from '../../scripts';

export class SuppliersPage extends PageModel {
  constructor(route) {
    super({ frontend: route });
  }

  get selectors() {
    return {
      supplierList: '.supplier-list',
      suppliers: '.supplier-list .supplier',
    };
  }
}
