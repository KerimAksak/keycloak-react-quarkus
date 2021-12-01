# keycloak-react-quarkus

## Installation - Keycloak

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)

### Requirements

---

- Docker
- Docker-Compose

Start Keycloak Server;

```console
➜  ~ docker-compose -f keycloak-postgres.yml up -d
```

### Admin Credentials

---

Username: admin

Password: Pa55w0rd

> You can find all the details about(POSTGRES_USER&POSTGRES_PASSWORD&KEYCLOAK_USER&KEYCLOAK_PASSWORD) Keycloak in the <b>keycloak-postgres.yml</b> file.

### User Credentials

---

| Username | Password | Role |
| -------- | -------- | ---- |
| kerim    | kerim    | USER |
| test     | test     | NONE |

### Keycloak Realm Config

---

Steps to import <b>demo-realm-export.json</b> file into Keycloak.

- [Select File] -> demo-realm-export.json

![keycloak-realm-config](.../img/keycloak-realm-config.png)

## Installation - Frontend

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)

```console
➜  ~ cd keycloak-frontend
➜  ~ npm install
➜  ~ npm start dev
```

Starting the development server from http://localhost:3000

## Installation - Backend

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)

```console
➜  ~ cd keycloak-backend
➜  ~ ./mvnw quarkus:dev
```

Starting the development server from http://localhost:9090
