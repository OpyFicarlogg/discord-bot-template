## Start with the bot 

#### Install project dependencies
* Go to the main directory of the project: `cd discord-bot-template`
* Install all dependencies: `npm install`

#### Configuration file
Copy the .env.exemple as .env
* `cp .env.example .env`  
* `rm ./.env.example`  
You need to define in this file the discord Token, the client id of the bot, and the guild id (discord server id) for test purpose

#### Execution of the bot
- Run the bot: `npm run start`
- Run the bot for debug purpose (auto reload and faster): `npm run start-dev`
- Send slash commands definition to a guild in dev : `npm run deploy-dev`
- Sens slash commands definition global : `npm run deploy`
- Launch all unit test : `npm run test`



## Description of the template

The file deploy-commands.ts allow to load all slash commands to a guild or in global
Two command line are define in package.json
* `deploy` : Register of the slash commands in global
* `deploy-dev` : Register of the slash commands in a guild 

It is possible to interract with the bot by two ways:

#### With message commands (prefix !)
* See if the bot responds`!ping`

#### With slash commands
* An exemple with args: `/exemple`
    - `user` : user that will be @ the user in the reply
    - `message` : Override the default message 
* See if the bot responds `/ping`



## Project details

### Ts-node dependency
TS-node allow to execute directly ts files instead of building js files to execute them. More simple for debug purpose.
- `npm install -D ts-node-dev`
- `npm install -D ts-node`
- `npm install --save-dev @types/node typescript`

### Dependency injection 
Inversify framework (https://github.com/inversify/InversifyJS) is the most used actually, and is based on interfaces.
`npm install inversify reflect-metadata --save`

* The class `types.ts` define the types that will be used.
* The class `inversify.config.ts` define links between injections


### Path management  
In order not to have extended paths everywhere, it is necessary to configure the tsconfig.json to define that the entry point is `src`, or path shortcuts

This allow to use `../../../../../thing` instead of `/thing` 

#### Modification in `tsconfig.json`:
```
    "moduleResolution": "node",   
     "baseUrl": "src",           
     "paths": {
       "@notify/*":["services/notify/*"], 
     },
```
You need to add `src` in the `ìnclude` part
`"include": ["src","tests"]`

#### Modification for Jest
In order to make path works in Jest, we need to add the dependencie `require-json5`, that allow to make a require on the tsconfig with comments.
* `npm i require-json5`   

In the jest.config.ts, we added: 
```
const requireJSON5 = require('require-json5');
const {compilerOptions} = requireJSON5('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest')

modulePaths: [compilerOptions.baseUrl],
moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
```


### Unit testing
The framework jest is used in this project for unit testing

Dependency: 
* `npm install jest @types/jest ts-jest -D`
* `npm install --save-dev @types/jest`
* `npm i jest-create-mock-instance`

for the file to be taken into account, it must contain `test`.
Example: `ping.test.ts`

To execute jest test:
`npm run test`

The result of the code coverage can be found in the `coverage` folder, and you can see the result in the folder `coverage/Icov-report/index.html`





Versionning: https://semver.org/lang/fr/