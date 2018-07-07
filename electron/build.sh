#!/bin/bash

cd ../angular/blink && npm install && ng build --base-href ./ && cd ../../electron
cp -R ../angular/blink/dist/blink/* dist/html/.

tsc
cp -R assets dist/.
electron dist/main.js
