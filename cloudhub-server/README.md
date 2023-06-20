# Cloudhub

The Personal File Management Project is an application designed to facilitate the storage and sharing of personal files in the same network environment.

## Requirements

- Docker
- Node.js

## How to use

- Clone the repo `https://github.com/Michael-Liendo/cloudhub`

- Copy ENV in server and client folder `cp .env.example .env`

- Go to the server folder `cd cloudhub/cloudhub-server`

- Start docker compose server `docker compose up`

- Go to the root folder `cd ..`

- Install dependencies `npx lerna bootstrap`

- Build the project `npx lerna run build`

- Start the server `npx lerna run start -- --port 3000 --host`
This command will start the project on port 3000 and on the specified host.
