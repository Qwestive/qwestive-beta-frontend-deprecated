# Qwestive FE

The FE for Qwestive.

## Branches

## Main Branch

Runs production code. Direct commits to this branch are strongly discouraged.
Instead, commit to qa branch and submit a PR for this branch.

## QA Branch

Runs pre-production code. All features should be thoroughly tested in this
branch before they are deployed to the main branch.

## Development

To download all dependencies, run:

```
yarn install
```

To initialize local server, run:

```
yarn start
```

To run all tests, run:

```
yarn test
```

## Style Guide

Refer to Airbnb JS style guide [here](https://github.com/airbnb/javascript).

Style guide is enforced by ESLint on pre-commit hook.

To manually run ESLint on project:

```
yarn lint
```

To manually run ESLint on project and fix errors:

```
yarn lint:fix
```

To manually format project with prettier:

```
yarn format
```

## Tech Stack

Bootstrapped with CRA Typescript, Tailwind for styles, Recoil for state management, Solana wallet connection through wallet-adapter, and Firebase for BE.

Includes:

- Typescript
- CRA
- Solana wallet adapter
  Code quality linting with ESLint <br />
  Code formatting with Prettier <br />
  Linting, typechecking and formatting on by default using husky for commit hooks <br />
  Testing with Jest and react-testing-library <br />
