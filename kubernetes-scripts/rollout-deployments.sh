#! /bin/bash

# sudo kubectl rollout restart deployment auth-deployment
# sudo kubectl rollout restart deployment dashboard-deployment
# sudo kubectl rollout restart deployment notification-deployment
# sudo kubectl rollout restart deployment api-gateway-deployment
# sudo kubectl rollout restart deployment web-app-deployment


sudo kubectl delete deployment auth-deployment
sudo kubectl apply -f auth_service_deployment.yaml
sudo kubectl delete deployment dashboard-deployment
sudo kubectl apply -f dashboard_deployment.yaml
sudo kubectl delete deployment notification-deployment
sudo kubectl apply -f notification_service_deployment.yaml
sudo kubectl delete deployment api-gateway-deployment
sudo kubectl apply -f gateway_deployment.yaml
sudo kubectl delete deployment web-app-deployment
sudo kubectl apply -f webapp_service_deployment.yaml