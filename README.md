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

## Project Architecture

This project follows the Page Object Model (POM) design pattern, which helps to create a scalable and maintainable test automation framework.

- **`cypress/e2e`**: This directory contains all the end-to-end test files (specs).
  - **`ui-automation-testing`**: This sub-directory contains the main test suites for the application.
- **`cypress/pages`**: This directory contains the page objects, which represent the pages of the application and encapsulate the logic for interacting with the UI elements.
- **`cypress/fixtures`**: This directory is used to store test data that can be used in the tests.
- **`cypress/support`**: This directory contains custom commands and other support files that can be used across all the tests.
- **`cypress.config.js`**: This is the main configuration file for Cypress.
- **`package.json`**: This file lists the project dependencies and defines the scripts for running the tests.