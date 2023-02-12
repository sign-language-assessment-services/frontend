#!/usr/bin/env sh

python /scripts/write_settings_file.py
nginx -g 'daemon off;'
RUN apk del python3

