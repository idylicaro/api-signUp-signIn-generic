[![Build Status](https://travis-ci.com/idylicaro/api-signUp-signIn-generic.svg?branch=master)](https://travis-ci.com/idylicaro/api-signUp-signIn-generic)
[![CodeFactor](https://www.codefactor.io/repository/github/idylicaro/api-signup-signin-generic/badge)](https://www.codefactor.io/repository/github/idylicaro/api-signup-signin-generic)
[![Maintainability](https://api.codeclimate.com/v1/badges/f7007fd3e90ed4243ae3/maintainability)](https://codeclimate.com/github/idylicaro/api-signUp-signIn-generic/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f7007fd3e90ed4243ae3/test_coverage)](https://codeclimate.com/github/idylicaro/api-signUp-signIn-generic/test_coverage)

---
# how use db with docker
I use the docker in this part of the application because I use two pcs for development and if other people wanted to help me, then I need an automated process to start the database, I will use knexjs to run seeds, migrations, so I decided to use the docker, but I still don't have a deep knowledge of the docker, this is a simple use of the docker 

- after install docker ...

- i use postgre 12.3, 12, latest

- this script sequence for create db

- Windows

``` docker pull postgres ```

``` docker run --name postgreDB -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=admin  -d -p 5432:5432 postgres  ```

- Ubuntu

``` sudo docker pull postgres ```

``` docker run --name postgreDB -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=admin  -d -p 5432:5432 postgres  ```

- use cli postgre
   ``` docker exec -it postgreDB psql -U postgres --password ```
   
---

# api-signUp-signIn-generic
![Diagram](https://github.com/idylicaro/api-condominium/blob/master/Docs/Diagrams/SignUpDiagram.png)
