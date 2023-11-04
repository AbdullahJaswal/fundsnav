#!/bin/sh

echo "Update sitemap"
npm run postbuild

echo "Starting Server"
npm run start-stag
