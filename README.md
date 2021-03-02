## Features

- Postgresql (DBMS)
- Pgadmin4 (PostgreSQL Tools )
- Hasura (Graph QL Engine)
- Hasura Backend Plus (Auth API)
- APIS (External APIS)
- Minio ( Storage)
- Caddy (Web Server)

## Installation

Use the package manager [docker-compose](https://docs.docker.com/compose/) to install foobar.

```bash
docker-compose up -d
```

## Usage to add external api

```yaml
   #To Create instance of Image Docker
  api2:
    image: test/api2:latest #tag of repository
    ports:                  # port of API
      - "3001:3001"
   environment:             #Environement Variable
      PORT: 3001
      SMPT_AUTH_USER: "test@gmail.com"
      SMPT_AUTH_PASS: "test@test"
      FromEmail: "info@test.com"

```

## Deployement

```yaml
#Deployement
caddy:
  image: abiosoft/caddy:0.11.0
  depends_on:
    - "graphql-engine"
    - "hasura-backend-plus"
    - "minio"
    - "pgadmin"
  ports:
    - "80:80"
    - "443:443"
  volumes:
    - ./Caddyfile:/etc/Caddyfile
    - caddy_certs:/root/.caddy
    - ./build:/var/www/html # deployement of build react
```

to deploy react just add the /build folder in the docker-compose folder
