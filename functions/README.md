# Firebase Functions

## What are they?

Firebase functions are backend functions, triggered either via https requests, cloud pub/sub or other specific Firebase events (e.g. database writes). They run within a nodejs environment and have full ability to interact with the firebase platform.
https://firebase.google.com/docs/functions/

## How are they used at One Army?

Currently

- Database backups

Future

- Image compression on upload

## How to build and deploy

The functions are not integrated into the existing CI pipeline for automated deployment as they require additional config. This is public for dev config however needs to be manually populated for production config (available from admins).

To deploy functions use the following scripts

`$cd functions`

dev:
`$npm run deploy-functions-dev`

prod:
`$npm run deploy-functions-prod`

## Adding cron tasks

Both production and live have small app-engine instances that run cron tasks, schedules can be seen in ../functions-cron.

If changing either of these remember to deploy both to production and development servers
