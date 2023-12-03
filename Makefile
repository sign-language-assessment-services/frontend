SHELL = /bin/sh
IMAGE_TAG = slportal_frontend # docker image tag

.PHONY: help
help:	## List targets and description
	@fgrep -h "##" Makefile | fgrep -v fgrep | sed -e 's/:.*##/:\n  /'

.PHONY: install
install:	## installs required dependencies
	npm install

.PHONY: build
build: install	## builds the application for production to the build folder
	npm run build

.PHONY: typecheck
typecheck: install	## check for type errors
	npm run typecheck

.PHONY: lint
lint: install	## statically analyzes code to quickly find problems
	npm run lint

.PHONY: lint-fix
lint-fix: install	## statically analyzes code and corrects automatically fixable problems
	npm run lint-fix

.PHONY: test-interactive
test-interactive: install	## launches the test runner in the interactive watch mode
	npm run test

.PHONY: test
test: install	## runs all tests
	CI=true npm run test

.PHONY: coverage
coverage:	## determines test coverage
	npm run coverage

.PHONY: run
run: install	## runs the application in development mode
	npm run start

.PHONY: precommit
precommit: typecheck build lint-fix test	## builds and tests the application

.PHONY: docker-build
docker-build:	## builds docker image from source code
	docker build -f Dockerfile -t ${IMAGE_TAG} .

.PHONY: run-container
run-container:	## runs application in a docker container on port 80
	docker run --rm -p 80:80 ${IMAGE_TAG}
