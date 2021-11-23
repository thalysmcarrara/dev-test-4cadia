### __Planning:__ 

thinking about the deadline of 7 days and the scope of tasks, I organized the tasks as follows:
  
<br />

> 1 day for planning, describe api routes, design basic frontend layout.

> 3 days to develop the API sorting the requirements by priority.

    API priorities:
      1. implement at least one route using TDD (/register)
      2. implement login and register routes
      3. implement the rest of the routes if time remains

> 3 days to develop the frontend also separating requirements by priorities.

    priorities:
      1. implement the pages referring to the developed API routes
      2. if you have time, develop other features without API interaction


---

### __API OPEN BANKING 4CADIA__

![Known Vulnerabilities](https://snyk.io/test/github/thalysmcarrara/dev-test-4cadia/badge.svg)

<br/>

### build with:
> javascript

> nodeJS

> express

> mongoDB

<br/>

### architecture:
  - MVCS

  ![](mvcsArchitecture.png)

:heavy_exclamation_mark: you can see the API routes documentation [here](https://app.swaggerhub.com/apis-docs/thalysmcarrara/OpenBanking/1.0.0) with more details:heavy_exclamation_mark:

<br/>

### external libraries used:
  - joi: Used for creating schemas to validate the request body

  - bcrypt: Used to encrypt user password before saving to database
  
  - jsonwebtoken: Used to generate and validate tokens

<br/>

- [link to deployed API](https://apidevtest4cadia.herokuapp.com/)

---
