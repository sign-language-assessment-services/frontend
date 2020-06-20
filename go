#!/usr/bin/env bash

# This script contains all tasks related to building, testing and running the application

## Adding a new task:
# 1. To add a task named 'example', implement it as a function named 'goal_example()'
# 2. Above the function name, add a usage hint, e.g. '##DOC: example: this is an example'
#    -> Usage hints will be displayed when running this script without any argument or with an unknown argument
# 3. The task can now be invoked with `./go example`

## Global variables ======================================================================

REPO_DIR="$(dirname "$0")" # base directory of this repository


## Tasks  ================================================================================

##DOC build: builds the application for production to the build folder
goal_build() {
  yarn install
  yarn build
}

##DOC lint: statically analyzes code to quickly find problems
goal_lint() {
  yarn install
  yarn lint
}

##DOC test: launches the test runner in the interactive watch mode
goal_test() {
  yarn install
  yarn test
}

##DOC run: runs the application in development mode
goal_run() {
  yarn install
  yarn start
}

##DOC precommit: builds and tests the application
goal_precommit() {
  yarn install
  yarn build
  yarn lint
  CI=true yarn test  # run all tests in non-interactive mode
}

##DOC image: builds docker image
goal_image() {
  docker build -t slas-frontend "$REPO_DIR"
}

## ========================================================================================

## Include go.helpers script which invokes specified task or prints usage hint
source "$REPO_DIR/go.helpers"
