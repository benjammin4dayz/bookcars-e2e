import { api } from '../support/bookcars';

describe('Api', () => {
  before(async () => {
    await api.fetchAll();
  });

  describe('Suppliers', () => {
    it('has an expected structure', () => {
      expect(api.suppliers).to.be.an('array').and.not.empty;

      api.suppliers.forEach(entry => {
        expect(entry).to.have.all.keys(['_id', 'fullName', 'avatar']);
      });
    });
  });

  describe('Locations', () => {
    it('has an expected structure', () => {
      expect(api.locations).to.be.an('array').and.not.empty;

      api.locations.forEach(entry => {
        expect(entry).to.have.all.keys([
          '_id',
          'createdAt',
          'name',
          'updatedAt',
          'value',
          'values',
          '__v',
        ]);
      });
    });
  });
});
