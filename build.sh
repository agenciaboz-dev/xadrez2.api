#!/bin/bash

api="xadrez2.api"
user="burgos"


path="~/${api}/"

echo 'compiling server files locally'
yarn build

echo 'Uploading build to server'
scp -r dist ${user}@agencyboz:${path}/

echo 'uploading .env to server'
scp .env ${user}@agencyboz:${path}/

echo 'uploading package.json to server'
scp package.json ${user}@agencyboz:${path}/

echo 'syncing dependencies'
ssh ${user}@agencyboz "source ~/.nvm/nvm.sh; cd ${path}; yarn install --production --frozen-lockfile"

echo 'restarting server api'
ssh ${user}@agencyboz "source ~/.nvm/nvm.sh; cd ${path}; pm2 restart ${api}"

echo 'finished'