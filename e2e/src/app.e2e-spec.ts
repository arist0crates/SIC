import { AppPage } from './app.po';
import { element, by } from 'protractor';
import { browser } from 'protractor';
import { NgSelectMultipleOption, SelectMultipleControlValueAccessor } from '@angular/forms/src/directives';
describe('workspace-project App', () => {
  browser.get('http://localhost:4200');
  it('should be home view', () => {
  
    browser.ignoreSynchronization = true;
    browser.waitForAngular();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/');
  });


  it('should change to Register view', () => {
    var register = element(by.id('register'));
    console.log("abcd");
    if(register==null){
      console.log("abcd");
    }
    register.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/signup');
  });
  it('should change to Login view', () => {
    var register = element(by.id('login'));
    console.log("abcd");
    if(register==null){
      console.log("abcd");
    }
    register.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/signin');
  });

});
