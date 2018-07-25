#!/bin/bash

mkdir -p dist/html
cd ../angular/blink && npm install && ng build --base-href ./ && cd ../../electron
cp -R ../angular/blink/dist/blink/* html/.

tsc
cp -R assets html/.
electron dist/main.js
