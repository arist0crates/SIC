import { AppPage } from './app.po';
import { element, by } from 'protractor';
import { browser } from 'protractor';
import { NgSelectMultipleOption, SelectMultipleControlValueAccessor } from '@angular/forms/src/directives';
import { isPending } from 'q';
describe('workspace-project App', () => {
  browser.get('http://localhost:4200');
  it('should be home view', () => {

    browser.ignoreSynchronization = true;
    browser.waitForAngular();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/');
  });


  it('should change to Register view', () => {
    var register = element(by.id('register'));


    register.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/signup');
  });
  it('should change to Login view', () => {
    var register = element(by.id('login'));

    register.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/signin');
  });
  it('should change to all views', () => {
    var register = element(by.id('register'));


    register.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/signup');
    var register = element(by.id('login'));

    register.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/signin');
  });
  it('should log in', () => {
    
    var login = element(by.id('login'));

    login.click();
    var email = element(by.id('email'));
    email.sendKeys('1160900@isep.ipp.pt');
    var password = element(by.id('password'));
    password.sendKeys('2ekgjgRwc9');
    var login = element(by.id('login'));
    login.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/signin');
  });
  it('should register', () => {

    var login = element(by.id('register'));

    login.click();
    var nome = element(by.id('name'));
    nome.sendKeys('abcd');
    var email = element(by.id('email'));
    email.sendKeys('116090wsaase0@isep.ipp.pt');
    var password = element(by.id('password'));
    password.sendKeys('2ekgjgRwc9');
    var checkbox = element(by.id('checkbox'));
    checkbox.click();
    var login = element(by.id('register'));
    login.click();

     expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/signup');

  }); 


});
