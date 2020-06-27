#!/usr/bin/env bash

# This script contains all tasks related to building, testing and running the application

## How to add a new task ================================================================

# 1. To add a task named 'example', implement it as a function named 'goal_example()' in the "Tasks" section below
# 2. Above the function name, add a usage hint, e.g. '##DOC: example: this is an example'
#    -> Usage hints will be displayed when running this script without any argument or with an unknown argument
# 3. The task can now be invoked with `./go example`


## Global variables ======================================================================

REPO_DIR=$(dirname "$0") # base directory of this repository
IMAGE_TAG=slas-frontend # docker image tag


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
  docker build -t "$IMAGE_TAG" "$REPO_DIR"
}

##DOC run-container: runs docker container
goal_run-container() {
  docker run -p 80:80 "$IMAGE_TAG"
}

##DOC run-compose: Get web api running through docker-compose.
goal_run-compose() {
  # `docker-compose` will start all configured services from the file
  # `docker-compose.yml`.  They will also (re)build if necessary.  Note
  # that the services has to be stopped via `./go stop-compose` to avoid
  # service restarts, even after a system reboot.
  docker-compose -f "$REPO_DIR/docker-compose.yml" up -d
}

##DOC stop-compose: Stop running fastapi network and attached services
goal_stop-compose() {
  # `docker-compose` will restart the app if possible, even after a
  # system reboot.  You have to explicitely stop the docker services.
  docker-compose -f "$REPO_DIR/docker-compose.yml" down
}


## ========================================================================================

## Include go.helpers script which invokes specified task or prints usage hint
source "$REPO_DIR/go.helpers"
