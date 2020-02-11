import { browser, by, element } from 'protractor';

export class AppPage {

  navigateTo(path?: string) {
    if (path){
      return browser.get(browser.baseUrl+path) as Promise<any>;
    }
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitle() {
   return browser.getTitle();
  }

  getButtonText() {
    return element(by.css('.btn')).getText() as Promise<string>;
  }

  login(password: string) {
    browser.waitForAngularEnabled(false);
    element(by.css('[placeholder = "Email"]')).sendKeys("protractor@protractor.com");
    element(by.css('[placeholder = "Password"]')).sendKeys(password);
    element(by.buttonText('Log in')).click();
    browser.sleep( 3 * 1000);
    return ;
  }

  isLoggedIn() {
    return element(by.css('.fa-sign-out')).isPresent() as Promise<boolean>;
  }
}
