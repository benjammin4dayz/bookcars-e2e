# Bookcars e2e

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
   git clone https://github.com/benjammin4dayz/bookcars-e2e.git
   cd bookcars-e2e
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

## Cypress Commands

### `login(where: 'frontend'|'backend', username?: string, password?: string)`

- Login helper; pre-loaded command with environment credentials. Can be set manually
