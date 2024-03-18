#!/bin/bash

# Create the build directory if it doesn't exist
mkdir -p build

# Compile Pug files into HTML files
pug views -o build
