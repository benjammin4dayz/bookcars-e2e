## Cypress e2e Template

A thoughtful project scaffold for writing Cypress e2e tests against multiple environments. I made it because I enjoy the challenge of building reasonable and conceptually scalable project architectures. In the process, I've learned a lot about Cypress and e2e testing!

Full disclaimer: I am not an e2e tester

## Project Structure

```
├───cypress
│   ├───e2e                 # Spec Workspace
│   ├───fixtures
│   └───support
│       ├───__template           # App-specific workspace
│       │   ├───pages            # Page object models
│       │   ├───scripts          # App-specific logic and helpers
│       │   └───env.config.js    # Resolved environment variables
│       └───global               # Cypress commands and global hooks
└───cypress.env.json             # Environment configuration and secrets
```

## Getting Started

### Installation

1. Clone the repo

   ```bash
   npx degit benjammin4dayz/cypress-e2e-template ez-e2e
   cd ez-e2e
   ```

2. Install dependencies

   ```bash
   npm install
   ```

### Usage

1. Create `cypress.env.json` and configure your testing environment.

2. Start Cypress

   ```bash
   npm start
   ```

3. Write & Run tests
