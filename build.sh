#!/bin/bash

npm install
npm run build
pm2 delete 'all'
pm2 start mongod
cp ../.env .
cd dist
pm2 start server.js