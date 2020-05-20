import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    browser.ignoreSynchronization = true;
  });

  it('should load main page', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('Apartments For Rent');
  });

  it('should load login page', () => {
    page.navigateTo('/log-in');
    expect(page.getButtonText()).toEqual('Log in');
  });

  it('should not load /orders subpage unauthorized', () => {
    page.navigateTo('/orders');
    browser.sleep(5000);
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'log-in');
  });


  it('should be able to login with right password and navigate to /orders subpage', () => {
    page.navigateTo('/log-in');
    page.login("protractor");
    expect(page.isLoggedIn()).toBe(true);
  });

  it('should not be able to login with not valid password', () => {
    page.navigateTo('/log-in');
    page.login("not_this_password");
    expect(browser.getCurrentUrl()).not.toEqual(browser.baseUrl);
   });

   afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
  });

});
