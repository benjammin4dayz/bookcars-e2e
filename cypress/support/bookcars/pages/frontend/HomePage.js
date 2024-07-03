import { PageModel, selectEffectfulOption, generateDates } from '../../scripts';

export class HomePage extends PageModel {
  constructor(route) {
    super({ frontend: route });
  }

  selectPickupLocation(target = 0, dataset) {
    selectEffectfulOption({
      inputEl: this.selectors.pickupLocationInput,
      matchKey: 'name',
      target,
      dataset,
    });
  }

  selectPickupDate(daysFromToday = 1, time = '10:00 AM') {
    const { start } = generateDates(daysFromToday, 7, time);
    this.el.pickupDateInput.click().type(start);
    return start;
  }

  selectDropoffDate(duration = 7, time = '10:00 AM') {
    const { end } = generateDates(1, duration, time);
    this.el.dropOffDateInput.click().type(end);
    return end;
  }

  searchForCars() {
    this.el.submitButton.click();
  }

  get selectors() {
    return {
      cover: '.home-cover',
      pickupLocationInput: '#\\:r0\\:',
      dropOffLocationInput: '', // only appears when 'return to same location' is unticked
      pickupDateInput: '#\\:r2\\:',
      dropOffDateInput: '#\\:r4\\:',
      submitButton: '[type="submit"]',
      suppliersHeader: '.suppliers > h1',
      slickSlider: '.slick-slider',
      mapHeader: 'h1.title',
      map: 'div.home-map > div.map ',
      footer: '.footer',
      footerHeader: '.footer > .header',
      footerCorporate: ':nth-child(1) > .title',
      footerAboutUs: ':nth-child(1) > .links > :nth-child(1)',
      footerTermsOfService: ':nth-child(1) > .links > :nth-child(2)',
      footerRentACar: ':nth-child(2) > .title',
      footerSuppliers: ':nth-child(2) > .links > :nth-child(1)',
      footerLocations: ':nth-child(2) > .links > :nth-child(2)',
      footerSupport: '.main > :nth-child(3) > .title',
      footerContact: ':nth-child(3) > .links > li',
      footerEmail: '.contact > a',
      footerPayment: '.payment',
      footerPaymentText: '.payment-text',
      footerPaymentImage: '.payment > img',
      footerCopyright: 'section.copyright',
    };
  }
}
