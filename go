#!/usr/bin/env bash

# This script contains all tasks related to building, testing and running the application

## Adding a new task:
# 1. To add a task named 'example', implement it as a function named 'goal_example()'
# 2. Above the function name, add a usage hint, e.g. '##DOC: example: this is an example'
#    -> Usage hints will be displayed when running this script without any argument or with an unknown argument
# 3. The task can now be invoked with `./go example`


## Tasks  ================================================================================

##DOC build: build the application
goal_build() {
  yarn build
}

##DOC test: execute all tests
goal_test() {
  yarn test
}

##DOC run: run the application
goal_run() {
  yarn start
}

## ========================================================================================

## Include go.helpers script which invokes specified task or prints usage hint
DIR_NAME="$(dirname "$0")"
source "$DIR_NAME/go.helpers"
