import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../pageobjects/LoginPage';
const loginPage = require('../pageobjects/LoginPage');

Given("I navigate to the Sky News website", () => {
    cy.visit(Cypress.env('baseUrl'));
    LoginPage.clickAcceptAllCookie();
})

When("I notice the available page titles", () => {
    LoginPage.availableSectionNames();
})

Then("I can affirm I am on the right section", () => {
    LoginPage.validateSectionNames();
})

Then("I should be able to navigate to the chosen page for relevant articles of {string}", (tab) => {
    LoginPage.relevantArticles(tab);
})

Then("I should be able to spot the default focus on Home tab", () => {
    LoginPage.verifyDefaultFocus();
})

Then("I navigate to {string} tab", (tab) => {
    LoginPage.clickAnotherTab(tab);
})

Then("The focus should change on to {string}", (tab) => {
    LoginPage.verifyFocus(tab);
})

When("I select a news article from any page", () => {
    LoginPage.selectArticle();
})

Then("I should ensure the title text appears in the article once the page loads", () => {
    LoginPage.verifyArticleTitle();
})
