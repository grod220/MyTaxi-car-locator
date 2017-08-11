import { MyTaxiTestPage } from './app.po';

describe('my-taxi-test App', () => {
  let page: MyTaxiTestPage;

  beforeEach(() => {
    page = new MyTaxiTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
