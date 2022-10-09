SHELL = /bin/sh
IMAGE_TAG = slportal_frontend # docker image tag

.PHONY: help
help:	## List targets and description
	@fgrep -h "##" Makefile | fgrep -v fgrep | sed -e 's/:.*##/:\n  /'

.PHONY: install
install:	## installs required dependencies
	yarn install

.PHONY: build
build: install	## builds the application for production to the build folder
	yarn build

.PHONY: typecheck
typecheck: install	## check for type errors
	yarn typecheck

.PHONY: lint
lint: install	## statically analyzes code to quickly find problems
	yarn lint

.PHONY: lint-fix
lint-fix: install	## statically analyzes code and corrects automatically fixable problems
	yarn lint-fix

.PHONY: test-interactive
test-interactive: install	## launches the test runner in the interactive watch mode
	yarn test

.PHONY: test
test: install	## runs all tests
	CI=true yarn test

.PHONY: run
run: install	## runs the application in development mode
	yarn start

.PHONY: precommit
precommit: typecheck build lint-fix test	## builds and tests the application

.PHONY: image
image:	## builds docker image
	docker build -t ${IMAGE_TAG} .

.PHONY: run-container
run-container:	## runs application in a docker container on port 80
	docker run --rm -p 80:80 ${IMAGE_TAG}
