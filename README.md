# jhipster-microfrontend

Demonstrates JHipster with webpack 5 Module Federation and Angular.

## Start

- Setup
```
npm install -g yarn
```
- Build
```
cd blog
yarn install
npm run java:docker
cd ../gateway
yarn install
npm run java:docker
docker-compose ../docker-compose/docker-compose.yml up -d
npm run java:server:await
```
- Navigate to http://localhost:8080
