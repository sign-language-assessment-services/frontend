#!/usr/bin/env bash

docker run -p 8080:8080  -e KEYCLOAK_ADMIN=admin -v key-cloak-data:/opt/keycloak/data -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:latest start-dev