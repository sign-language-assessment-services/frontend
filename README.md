# Sign Language Assessment Services - Frontend

This app is written in [TypeScript](https://www.typescriptlang.org/) and uses the [React](https://reactjs.org/) framework.
It serves as a frontend for [sign-language-assessment-services/backend](https://github.com/sign-language-assessment-services/backend).

## Prerequisites

The following software is required to use this app:

- [Node.js](https://nodejs.org/) >= 12.4.0
- [bash](https://www.gnu.org/software/bash/) if you want to use the `make` script for build automation
  - **Windows**: there are several options to use bash, e.g.
    - [Git BASH](https://gitforwindows.org/)
    - [Windows Subsystem for Linux](https://docs.microsoft.com/windows/wsl/install-win10)
    - [Cygwin](https://www.cygwin.com/)
  - **MacOS**: bash is already pre-installed
  - **Linux**: In nearly all distributions, bash is already pre-installed
- [Docker](https://www.docker.com/) if you want to run the app in a Docker container

## Build automation: `Makefile`

All tasks related to building, testing, and running can be invoked with
make commands. Run `make help` to see a list of all available tasks.

**NOTE**: If you prefer to perform certain tasks manually, the content of the
file is probably interesting for you, e.g. if you want to run the server on
a different port or name the docker container differently.

## Build

`make build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Test

`make test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Run

`make run`

**NOTE**: Requires [backend](https://github.com/sign-language-assessment-services/backend) to run locally on port 8000.

Runs the app in development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Learn More

- You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

- To learn React, check out the [React documentation](https://reactjs.org/).

- To learn Typescript, check out the [TypeScript documentation](https://www.typescriptlang.org/).
