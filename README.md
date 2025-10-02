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

```
cypress/
├── downloads/                  # Downloaded files during tests
├── e2e/                        # End-to-end test specs
│   └── ui-automation-testing/  # Feature-based test grouping
│       ├── signIn.cy.js        # Sign-in test suite
│       └── signUp.cy.js        # Sign-up test suite
├── fixtures/                   # Static test data
│   └── example.json            # Example fixture file
├── pages/                      # Page Object Model (POM) layer
│   └── signUpPage.js           # Page object for sign-up/sign-in page
├── screenshots/                # Screenshots captured during test runs
└── support/                    # Support files and custom commands
    ├── commands.js             # Custom Cypress commands
    └── e2e.js                  # Global hooks and configurations
```

- **`cypress.config.js`**: This is the main configuration file for Cypress.
- **`package.json`**: This file lists the project dependencies and defines the scripts for running the tests.
