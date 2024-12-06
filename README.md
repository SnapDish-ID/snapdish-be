# snapdish-be

## Contents

- [How to run](#how-to-run)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Routines](#routines)
- [Branches](#branches)
- [Diagrams](#diagrams)

## How to run
### Prerequisites
- [git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/) (recommended version is `22.11.x` _Long Term Support_)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (usually comes with Node.js)
- [classic yarn](https://yarnpkg.com/getting-started/install) (recommended version is `1.22.22`)
    ```bash
    > npm install -g yarn
    ```

### Setup
1. Clone this repository, ___Make sure you have [git](https://git-scm.com/downloads) installed and already set up___
    ```bash
    > git clone https://github.com/SnapDish-ID/snapdish-be.git
    ```
2. Go to the project directory

3. Install dependencies
    ```bash
    snapdish-be> yarn
    ```
4. Run the project
    ```bash
    snapdish-be> yarn dev
    ```

### Routines
- Check for updates in `dev` branch
    ```bash
    > git pull
    ```
- Install dependencies
    ```bash
    > yarn
    ```
- Run the project
    ```bash
    > yarn dev
    ```
  
## Branches
- `main` = latest stable (___DEPLOYED PRODUCTION___) version\
    __Do not push directly to this branch__
- `staging` = latest development (___DEPLOYED DEVELOPMENT___) version\
    __Only Hotfix commit is allowed to be pushed directly to this branch__
- `dev` is the development branch, where the latest development (___LOCAL DEVELOPMENT___) version of the project is stored
  - make a new branch for each feature, bugfix, or enhancement from `dev` branch
  - use merge request to merge `dev` --> `staging` and `staging` --> `main`

## Diagrams
___Diagrams in [eraser](https://app.eraser.io/workspace/hYXTwS6zdRpDR4TwviJO)___
- Activity
- Prod Architecture
- Dev Architecture
- Git Workflow