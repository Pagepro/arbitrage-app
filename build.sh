#!/bin/bash

npm install
npm run build
pm2 stop 'all'
pm2 start mongod
cd dist
pm2 start server.js