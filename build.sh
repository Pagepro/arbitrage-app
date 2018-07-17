#!/bin/bash

npm install
npm run build
pm2 delete 'all'
pm2 start mongod
cd dist
cp ../../.env .
pm2 start server.js