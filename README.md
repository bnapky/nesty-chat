# Nesty Chat!

Realtime chat with support for multiple lobbies and a bot that receives commands to query stock quotes. (/stock=aapl.us).

## Tech-stack: 
  * NestJs  
  * Angular(8)  
  * RabbitMq  


## How to run:

### Clone:
  ``` git clone https://github.com/bnapky/nesty-chat.git ```

#### Run backend:
  1. cd nesty-chat
  2. npm i 
  3. npm start 

#### Run stocky-bot:
  1. cd stocky-bot 
  2. npm i 
  3. node main.js 


#### run front-end
  1. cd nesty-chat-client 
  2. npm i 
  3. npm start
  4. navigate to http://localhost:4200/

### Features 

* Jwt Authentication on rest API endpoints and web socket connections.
* Local strategy to login and register.
* User encrypted password and strength validation
* Multiple Lobbies
* Angular(8) Material Front-end quickly put together that looks horrible :D
* In-memory database for a development environment.

* Linting and running tests on pre-commit
* VsCode debugger support

* Example spec files (jest)
  * UserService
  * AuthService
  * ChatGateway

* Example mocking of services and repositories 
  * UserMockService
  * AuthMockService

### Query stock quotes with a command
Login and input command /stock={stock_code} to query stock quotes from https://stooq.com
eg: /stock=aapl.us

### Stay in touch

- Author - [Brandon Napky](https://www.linkedin.com/in/brandon-napky-747826b8/)

### License
  This project is [MIT licensed](https://en.wikipedia.org/wiki/MIT_License).
