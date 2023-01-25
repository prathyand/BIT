# BookInTime (TheBIT)
[![build-test](https://github.com/prathyand/BIT/actions/workflows/CI.yml/badge.svg)](https://github.com/prathyand/BIT/actions/workflows/CI.yml)
[![Deploy](https://github.com/prathyand/BIT/actions/workflows/CD.yml/badge.svg)](https://github.com/prathyand/BIT/actions/workflows/CD.yml)


![sysarch](assets/logo.svg?raw=true "logo")


### :computer: [Production URL](http://149.165.169.69/)


**Repository Structure**
```
.
└── root/
    ├── .github/
    │   └── workflows/
    │       ├── CI.yml
    │       └── CD.yml
    ├── assets/
    ├── kubernetes-scripts/
    ├── src/
    │   ├── auth_service/
    │   ├── dashboard_service/
    │   ├── notification_service/
    │   ├── api_gateway/
    │   ├── frontend/
    │   ├── docker-compose.yml
    │   └── docker-compose_aws.yml
    ├── .gitignore
    └── README.md
```
## To build and run the project (Linux)
```sh
# First clone the repository
git clone https://github.iu.edu/pdeshmuk/TheBIT.git

# cd into the src directory
cd TheBIT/src

# build the container 
docker compose build

# run the container in detached mode
docker compose up -d
```
access the application on localhost (http://localhost/)



```sh
# to stop the application
docker compose stop

# to remove the containers (cleanup)
docker compose rm --force
```

## 📦 Technology Stack
- ReactJS
- NodeJS
- ExpressJS
- Docker
- Kubernetes
- Python
- MongoDB
- RabbitMQ


## :building_construction: System Architecture

![sysarch](assets/system_arch.png?raw=true "sysarch")


## :arrows_clockwise: CI-CD Workflow

![sysworkflow](assets/workflow.svg?raw=true "sysworkflow")


## 💪🏽 Team 

- **Prathmesh Deshmukh**: Second year Master's student studying at Indiana University Bloomington, majoring in Computer Science.

    [<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/prathyand/)
    [<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />](https://github.com/prathyand)


- **Brendan Mcshane**: Second year Master's student studying at Indiana University Bloomington, majoring in Computer Science.

    [<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/brendanmcshane/)
    [<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />](https://github.com)


- **Shanthan Reddy**: First year Master's student studying at Indiana University Bloomington, majoring in Computer Science.

    [<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/shanthan-reddy-m/)
    [<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />](https://github.com)


- **Aditya Shahapure**: First year Master's student studying at Indiana University Bloomington, majoring in Computer Science.

    [<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/aditya-s-shahapure/)
    [<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />](https://github.com)
