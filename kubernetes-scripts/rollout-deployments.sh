#! /bin/bash

sudo kubectl rollout restart deployment auth-deployment
sudo kubectl rollout restart deployment dashboard-deployment
sudo kubectl rollout restart deployment notification-deployment
sudo kubectl rollout restart deployment api-gateway-deployment
sudo kubectl rollout restart deployment web-app-deployment