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