# BookInTime (TheBIT)
[![build-test](https://github.iu.edu/pdeshmuk/TheBIT/actions/workflows/CI.yml/badge.svg)](https://github.iu.edu/pdeshmuk/TheBIT/actions/workflows/CI.yml)
[![Deploy](https://github.iu.edu/pdeshmuk/TheBIT/actions/workflows/CD.yml/badge.svg)](https://github.iu.edu/pdeshmuk/TheBIT/actions/workflows/CD.yml)
### [TheBIT](http://149.165.169.69/)

Repository Structure
```
.
└── root/
    ├── .github/
    │   └── workflows/
    │       ├── CI.yml
    │       └── CD.yml
    ├── src/
    │   ├── auth_service
    │   ├── frontend
    │   ├── api_gateway
    │   ├── dashboard_service
    │   ├── docker-compose.yml
    │   └── docker-compose_aws.yml
    ├── .gitignore
    └── README.md
```
## To build and run the project (LINUX)
```sh
cd src
docker compose build
docker compose up -d
```
access the application on localhost (http://localhost/)

to stop the application

```sh
docker compose stop
```
to clean the containers:
```sh
docker compose rm --force
```

## 📦 Technology Stack
- ReactJS
- NodeJS
- ExpressJS
- RESTful Webservices
- Docker
- Python
- MongoDB
- RabbitMQ


## :building_construction: System Architecture

![sysarch](assets/system_arch.svg?raw=true "sysarch")


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