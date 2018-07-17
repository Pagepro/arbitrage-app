#!/bin/bash

npm install
npm run build
pm2 stop 'all'
pm2 start mongod
npm start