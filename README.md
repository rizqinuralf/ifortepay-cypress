# Cypress Automation Test for Ifortepay Assessment

This project contains automated tests for the Ifortepay assessment, specifically testing the website https://automationexercise.com/ using Cypress.

This project uses the `faker` library to generate random data for the tests.

## Installation

To install the dependencies, run the following command:

```bash
npm install
```

## Running the tests

To run the tests, use the following command:

```bash
npx cypress run
```

This will run all the tests in the `cypress/e2e` directory.

To run a specific test, use the following command:

```bash
npx cypress run --spec cypress/e2e/signUp.cy.js
```
