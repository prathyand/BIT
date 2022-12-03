#! /bin/bash

sudo kubectl create namespace rabbits
sudo kubectl create -n rabbits -f rabbit-configmap.yaml
sudo kubectl create -n rabbits -f rabbit-rbac.yaml
sudo kubectl create -n rabbits -f rabbit-secret.yaml
sudo kubectl create -n rabbits -f rabbit-statefulset.yaml
