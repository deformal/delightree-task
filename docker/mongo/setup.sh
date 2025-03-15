#!/bin/bash
username=$MONGO1_USERNAME
password=$MONGO1_PASSWORD

sleep 10
mongosh mongodb://$MONGO1_USERNAME:$MONGO1_PASSWORD@mongo1:27017 init.js