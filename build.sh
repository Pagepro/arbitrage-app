#!/bin/bash

npm install
npm run build
mv ../public ./dist
pm2 delete 'all'
pm2 start mongod
cp ../.env ./dist
pm2 start npm --start