import { AppPage } from './app.po';
import { element, by } from 'protractor';
import { browser } from 'protractor';
describe('workspace-project App', () => {
  browser.get('http://localhost:4200');

  it('should change to Register view', () => {
    var register = element(by.id('register'));
    register.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/signin');
  });
});
