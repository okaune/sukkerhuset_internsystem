# Sukkerhuset internsystem

Komplett internsystem tilpasset Sukkerhuset sine behov.
Se [designskisser](https://www.figma.com/file/c7Vfp4aCbxmp24q9LbOMb5/Sukkerhuset-internsystem?node-id=0%3A1).

## Utvikling

For å jobbe med dette prosjektet trenger du å installere [Node.js](https://nodejs.org/), [Yarn](https://yarnpkg.com/) og [Docker](https://www.docker.com/).

Det anbefales å bruke VSCode med plugin for ESLint under utvikling, da prosjektet er satt opp for å automatisk fikse formatering ved lagring.


### Kommandoer

`yarn bootstrap` Installerer alle avhengigheter

`yarn up` Setter opp Dockerkonteinere for MongoDB og Redis for utvikling

`yarn start` Starter utviklingsserver for API og klient

`yarn stop` Stopper Dockerkonteinere

`yarn down` Fjerner Dockerkonteinere

`yarn lint` Kjører ESLint på prosjektet

`yarn lint:fix` Kjører ESLint og Prettier på prosjektet